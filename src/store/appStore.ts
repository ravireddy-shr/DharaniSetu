import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Application, ApplicationStatus, ApplicationStatusHistory, Document, Notification, AuditLog, WorkflowStage, WorkflowStageStatus, LandParcel } from '../types';
import { DEMO_SERVICES, DEMO_OFFICERS, SERVICE_WORKFLOW_MAP, DEMO_PARCELS, DEMO_FARMER_CITIZENS, getOfficersForMandal, getAssignedTahsildarForMandal } from '../data/demoData';
import { isSupabaseConfigured, fetchLandParcels, fetchApplications, insertApplicationToSupabase, updateApplicationInSupabase, subscribeToApplications } from '../services/supabase';

// ---------- Token Generator ----------
function generateToken(stateCode: string): string {
  const year = new Date().getFullYear();
  const seq = String(Math.floor(Math.random() * 900000) + 100000);
  return `DS-${stateCode}-${year}-${seq}`;
}

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// ---------- Jurisdiction Router ----------
function routeToOfficer(mandalId: string, department: string): { officerId: string; officerName: string } {
  const officersInMandal = getOfficersForMandal(mandalId, department);
  if (officersInMandal.length > 0) {
    return { officerId: officersInMandal[0].id, officerName: officersInMandal[0].name };
  }
  // Fallback to any Tahsildar in that mandal
  const tahsildar = getAssignedTahsildarForMandal(mandalId);
  return { officerId: tahsildar.id, officerName: tahsildar.name };
}

// ---------- Store ----------
interface AppState {
  parcels: LandParcel[];
  applications: Application[];
  statusHistory: ApplicationStatusHistory[];
  documents: Document[];
  notifications: Notification[];
  auditLogs: AuditLog[];
  isLoadingSupabase: boolean;

  // Actions
  syncWithSupabase: () => Promise<void>;

  submitApplication: (data: {
    citizenId: string;
    citizenName: string;
    citizenEmail: string;
    serviceId: string;
    parcelId: string;
    surveyNumber: string;
    village: string;
    mandalId: string;
    mandalName: string;
    districtId: string;
    districtName: string;
    stateId: string;
    stateName: string;
    formData: Record<string, string>;
    uploadedDocs: { name: string; fileName: string; fileSize: number; mimeType: string; fileData?: string }[];
    aiDiscrepancy?: {
      deedArea: number;
      surveyArea: number;
      variancePercent: number;
      flag: string;
    };
  }) => Application;

  updateApplicationStatus: (
    applicationId: string,
    newStatus: ApplicationStatus,
    changedBy: string,
    changedByName: string,
    remarks?: string
  ) => void;

  advanceDepartmentWorkflow: (
    applicationId: string,
    action: 'APPROVE' | 'REJECT' | 'CORRECTION' | 'FORWARD',
    officerId: string,
    officerName: string,
    department: string,
    remarks: string
  ) => void;

  reconcileApplicationDiscrepancy: (
    applicationId: string,
    action: 'APPROVE_ADJUSTED' | 'REQUEST_RESURVEY' | 'REJECT',
    officerNotes: string,
    changedBy: string,
    changedByName: string
  ) => void;

  addDocument: (doc: Omit<Document, 'id' | 'status' | 'uploadedAt'>) => void;
  verifyDocument: (docId: string, status: 'verified' | 'rejected') => void;

  getApplicationById: (id: string) => Application | undefined;
  getApplicationByToken: (token: string) => Application | undefined;
  getApplicationsForCitizen: (citizenId: string, email?: string, name?: string) => Application[];
  getApplicationsForOfficer: (officerId: string) => Application[];
  getStatusHistory: (applicationId: string) => ApplicationStatusHistory[];
  getDocuments: (applicationId: string) => Document[];
  getNotifications: (userId: string) => Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (userId: string) => void;
  getAuditLogs: () => AuditLog[];

  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
  addNotification: (notif: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) => void;

  seedDemoApplications: (citizenId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      parcels: DEMO_PARCELS,
      applications: [],
      statusHistory: [],
      documents: [],
      notifications: [],
      auditLogs: [],
      isLoadingSupabase: false,

      syncWithSupabase: async () => {
        if (!isSupabaseConfigured) return;
        set({ isLoadingSupabase: true });
        try {
          const [fetchedParcels, fetchedApps] = await Promise.all([
            fetchLandParcels(),
            fetchApplications([]),
          ]);

          // Supabase is the strict single source of truth for applications
          set({
            parcels: fetchedParcels,
            applications: fetchedApps,
            isLoadingSupabase: false,
          });
          console.log('[DharaniSetu] Synchronized with Supabase:', fetchedParcels.length, 'parcels,', fetchedApps.length, 'applications');
        } catch (error) {
          console.error('[DharaniSetu] Failed to sync with Supabase:', error);
          set({ isLoadingSupabase: false });
        }
      },

      submitApplication: (data) => {
        const service = DEMO_SERVICES.find(s => s.id === data.serviceId);
        if (!service) throw new Error('Service not found');

        const { officerId, officerName } = routeToOfficer(data.mandalId, service.department);
        const tokenNumber = generateToken(data.stateId);
        const now = new Date().toISOString();

        // Default or simulated AI Discrepancy analysis
        const deedArea = parseFloat(data.formData.deedArea || '1.0');
        const surveyArea = parseFloat(data.formData.surveyArea || (deedArea > 0.5 ? (deedArea - 0.1).toFixed(2) : deedArea.toString()));
        const variance = parseFloat((((surveyArea - deedArea) / deedArea) * 100).toFixed(1));

        const aiDiscrepancy = data.aiDiscrepancy || {
          deedArea,
          surveyArea,
          variancePercent: variance,
          flag: Math.abs(variance) > 5 
            ? `Area Variance Detected (${variance}%) · Physical Field Verification Required`
            : 'Area Extent Verified · Within 1% Statutory Cadastral Tolerance',
          reconciliationStatus: 'PENDING' as const,
        };

        // Construct dynamic multi-department workflow stages for this service
        const workflowConfigs = SERVICE_WORKFLOW_MAP[service.type] || [
          {
            department: 'Revenue',
            roleName: 'Revenue Scrutiny Officer',
            officialTitle: 'Village Revenue Officer & Revenue Inspector',
            description: 'Scrutinizes statutory ownership records and non-encumbrance',
            documentsVerified: ['Title Deed', 'Encumbrance Certificate'],
            slaDays: 3,
          },
          {
            department: 'Survey',
            roleName: 'Cadastral Survey Officer',
            officialTitle: 'Mandal Cadastral Surveyor',
            description: 'Verifies cadastral map and physical boundary',
            documentsVerified: ['FMB Sketch'],
            slaDays: 5,
          },
          {
            department: 'Final Authority',
            roleName: 'Tahsildar & Executive Magistrate',
            officialTitle: 'Tahsildar & Executive Magistrate',
            description: 'Issues statutory decree and updates land ledger',
            documentsVerified: ['Department Clearances'],
            slaDays: 4,
          },
        ];

        const workflowStages: WorkflowStage[] = workflowConfigs.map((cfg, idx) => ({
          id: `STG-${idx + 1}-${Date.now()}`,
          department: cfg.department,
          roleName: cfg.roleName,
          officialTitle: cfg.officialTitle,
          description: cfg.description,
          documentsVerified: cfg.documentsVerified,
          status: idx === 0 ? 'IN_PROGRESS' : 'PENDING',
          slaDays: cfg.slaDays,
        }));

        const initialDepartment = workflowStages[0]?.department || 'Revenue';
        const initialOfficer = routeToOfficer(data.mandalId, initialDepartment);

        const application: Application = {
          id: generateId('APP'),
          tokenNumber,
          citizenId: data.citizenId,
          citizenName: data.citizenName,
          citizenEmail: data.citizenEmail,
          serviceId: data.serviceId,
          serviceType: service.type,
          serviceName: service.name,
          parcelId: data.parcelId,
          surveyNumber: data.surveyNumber,
          village: data.village,
          mandalId: data.mandalId,
          mandalName: data.mandalName,
          districtId: data.districtId,
          districtName: data.districtName,
          stateId: data.stateId,
          stateName: data.stateName,
          assignedOfficerId: officerId,
          assignedOfficerName: officerName,
          status: 'ROUTED',
          formData: data.formData,
          submittedAt: now,
          updatedAt: now,
          aiDiscrepancy,
          currentDepartment: initialDepartment,
          currentStageIndex: 0,
          workflowStages,
        };

        const history: ApplicationStatusHistory[] = [
          {
            id: generateId('HST'),
            applicationId: application.id,
            status: 'SUBMITTED',
            changedBy: data.citizenId,
            changedByName: data.citizenName,
            remarks: 'Application submitted by citizen. Case file initialized.',
            timestamp: now,
          },
          {
            id: generateId('HST'),
            applicationId: application.id,
            status: 'ROUTED',
            changedBy: 'SYSTEM',
            changedByName: 'DharaniSetu System',
            remarks: `Routed to ${initialDepartment} Desk (${workflowStages[0]?.roleName}).`,
            timestamp: new Date(Date.now() + 1000).toISOString(),
          },
        ];

        // Documents
        const docs: Document[] = data.uploadedDocs.map(d => ({
          id: generateId('DOC'),
          applicationId: application.id,
          name: d.name,
          fileName: d.fileName,
          fileSize: d.fileSize,
          mimeType: d.mimeType,
          status: 'pending',
          uploadedAt: now,
          fileData: d.fileData,
        }));

        // Notifications
        const citizenNotif: Notification = {
          id: generateId('NTF'),
          userId: data.citizenId,
          title: 'Application Submitted',
          message: `Your application ${tokenNumber} has been submitted and assigned to Tahsildar ${officerName}.`,
          applicationId: application.id,
          tokenNumber,
          isRead: false,
          createdAt: now,
        };

        const officerNotif: Notification = {
          id: generateId('NTF'),
          userId: officerId,
          title: 'New Statutory Application Assigned',
          message: `New application ${tokenNumber} for ${service.name} (${data.village}, Survey #${data.surveyNumber}) requires your action.`,
          applicationId: application.id,
          tokenNumber,
          isRead: false,
          createdAt: now,
        };

        // Audit
        const audit: AuditLog = {
          id: generateId('AUD'),
          userId: data.citizenId,
          userName: data.citizenName,
          userRole: 'citizen',
          action: 'APPLICATION_SUBMITTED',
          entityType: 'application',
          entityId: application.id,
          details: `Application ${tokenNumber} submitted for ${service.name}. Survey: ${data.surveyNumber}, Mandal: ${data.mandalName}`,
          timestamp: now,
        };

        set(state => ({
          applications: [application, ...state.applications],
          statusHistory: [...state.statusHistory, ...history],
          documents: [...state.documents, ...docs],
          notifications: [
            citizenNotif,
            officerNotif,
            ...state.notifications,
          ],
          auditLogs: [audit, ...state.auditLogs],
        }));

        // Persist to Supabase if live connection configured
        if (isSupabaseConfigured) {
          insertApplicationToSupabase(application).catch(err => {
            console.warn('[DharaniSetu] Failed background insert to Supabase:', err);
          });
        }

        return application;
      },

      updateApplicationStatus: (applicationId, newStatus, changedBy, changedByName, remarks) => {
        const now = new Date().toISOString();
        set(state => {
          const app = state.applications.find(a => a.id === applicationId);
          if (!app) return state;

          const historyEntry: ApplicationStatusHistory = {
            id: generateId('HST'),
            applicationId,
            status: newStatus,
            changedBy,
            changedByName,
            remarks,
            timestamp: now,
          };

          const notifications = [...state.notifications];
          // Notify citizen
          notifications.unshift({
            id: generateId('NTF'),
            userId: app.citizenId,
            title: `Application ${newStatus.replace(/_/g, ' ')}`,
            message: `Your application ${app.tokenNumber} status has been updated to: ${newStatus.replace(/_/g, ' ')}. ${remarks || ''}`,
            applicationId,
            tokenNumber: app.tokenNumber,
            isRead: false,
            createdAt: now,
          });

          const auditLog: AuditLog = {
            id: generateId('AUD'),
            userId: changedBy,
            userName: changedByName,
            userRole: 'officer',
            action: `STATUS_CHANGED_TO_${newStatus}`,
            entityType: 'application',
            entityId: applicationId,
            details: `Application ${app.tokenNumber} status changed to ${newStatus}. ${remarks || ''}`,
            timestamp: now,
          };

          const updatedApp: Application = { ...app, status: newStatus, updatedAt: now, remarks };
          if (isSupabaseConfigured) {
            updateApplicationInSupabase(updatedApp).catch(err => {
              console.warn('[DharaniSetu] Failed background update to Supabase:', err);
            });
          }

          return {
            applications: state.applications.map(a =>
              a.id === applicationId ? updatedApp : a
            ),
            statusHistory: [...state.statusHistory, historyEntry],
            notifications,
            auditLogs: [auditLog, ...state.auditLogs],
          };
        });
      },

      advanceDepartmentWorkflow: (applicationId, action, officerId, officerName, department, remarks) => {
        const now = new Date().toISOString();
        set(state => {
          const app = state.applications.find(a => a.id === applicationId);
          if (!app) return state;

          const stages = [...(app.workflowStages || [])];
          const curIdx = app.currentStageIndex ?? 0;
          const curStage = stages[curIdx];

          // Strict RBAC Access Restriction:
          // Admin (ADM-001 or role admin) has Master Control across all desks.
          // Other officers can ONLY approve/reject/request correction if their department matches the active stage department.
          const isAdmin = officerId === 'ADM-001' || officerId.startsWith('ADM');
          const stageDept = curStage?.department || app.currentDepartment;
          const isDeskAuthorized = isAdmin || (
            stageDept && department &&
            stageDept.trim().toLowerCase() === department.trim().toLowerCase()
          );

          if (!isDeskAuthorized) {
            console.warn(`[SECURITY ALERT] Cross-departmental action blocked: ${officerName} (${department}) attempted to ${action} on ${app.tokenNumber} currently at ${stageDept} desk.`);
            return state;
          }

          let nextStatus: ApplicationStatus = app.status;
          let nextDepartment = app.currentDepartment || department;
          let nextStageIndex = curIdx;
          let historyRemarks = remarks;

          let nextAssignedOfficerId = app.assignedOfficerId;
          let nextAssignedOfficerName = app.assignedOfficerName;

          if (action === 'APPROVE') {
            // Mark current department stage as APPROVED
            if (curStage) {
              stages[curIdx] = {
                ...curStage,
                status: 'APPROVED',
                actionBy: officerId,
                actionByName: officerName,
                actionDate: now,
                remarks,
              };
            }

            // Check if there is a next stage in the sequence
            if (curIdx + 1 < stages.length) {
              nextStageIndex = curIdx + 1;
              const nextStage = stages[nextStageIndex];
              stages[nextStageIndex] = {
                ...nextStage,
                status: 'IN_PROGRESS',
              };
              nextDepartment = nextStage.department;
              const nextOfficer = routeToOfficer(app.mandalId, nextDepartment);
              nextAssignedOfficerId = nextOfficer.officerId;
              nextAssignedOfficerName = nextOfficer.officerName;

              nextStatus = nextDepartment === 'Survey' ? 'GIS_VERIFICATION'
                : nextDepartment === 'Town Planning' ? 'FIELD_VERIFICATION'
                : 'OFFICER_REVIEW';

              historyRemarks = `Approved by ${department} (${officerName}) and transferred to ${nextDepartment} (${nextStage.roleName} - ${nextOfficer.officerName}). Remarks: ${remarks}`;
            } else {
              // Reached end of pipeline: Final Authority Approved
              nextStatus = 'COMPLETED';
              historyRemarks = `Final Statutory Clearance granted by ${department} (${officerName}). Order issued and land record synchronized. Remarks: ${remarks}`;
            }
          } else if (action === 'FORWARD') {
            if (curIdx + 1 < stages.length) {
              nextStageIndex = curIdx + 1;
              const nextStage = stages[nextStageIndex];
              stages[nextStageIndex] = {
                ...nextStage,
                status: 'IN_PROGRESS',
              };
              nextDepartment = nextStage.department;
              const nextOfficer = routeToOfficer(app.mandalId, nextDepartment);
              nextAssignedOfficerId = nextOfficer.officerId;
              nextAssignedOfficerName = nextOfficer.officerName;
              nextStatus = 'OFFICER_REVIEW';
              historyRemarks = `Forwarded by ${department} (${officerName}) to ${nextDepartment} (${nextOfficer.officerName}). Remarks: ${remarks}`;
            }
          } else if (action === 'CORRECTION') {
            if (curStage) {
              stages[curIdx] = {
                ...curStage,
                status: 'CORRECTION_REQUIRED',
                actionBy: officerId,
                actionByName: officerName,
                actionDate: now,
                remarks,
              };
            }
            nextStatus = 'ADDITIONAL_INFORMATION_REQUIRED';
            historyRemarks = `Correction requested by ${department} (${officerName}): ${remarks}`;
          } else if (action === 'REJECT') {
            if (curStage) {
              stages[curIdx] = {
                ...curStage,
                status: 'REJECTED',
                actionBy: officerId,
                actionByName: officerName,
                actionDate: now,
                remarks,
              };
            }
            nextStatus = 'REJECTED';
            historyRemarks = `Rejected by ${department} (${officerName}). Grounds: ${remarks}`;
          }

          const historyEntry: ApplicationStatusHistory = {
            id: generateId('HST'),
            applicationId,
            status: nextStatus,
            changedBy: officerId,
            changedByName: officerName,
            remarks: historyRemarks,
            timestamp: now,
          };

          const notifications = [...state.notifications];
          const updatedDocs = [...state.documents];
          const isAllDepartmentsApproved = stages.every(s => s.status === 'APPROVED');
          const isGrievanceService = app.serviceType === 'grievance';
          const isFinalClearance = action === 'APPROVE' && nextStatus === 'COMPLETED' && isAllDepartmentsApproved && isGrievanceService;

          if (isFinalClearance) {
            const certDoc: Document = {
              id: generateId('DOC-CERT'),
              applicationId: app.id,
              name: 'Tahsildar Certified Land Ownership & Dispute Clearance Order',
              fileName: `Tahsildar_Dispute_Clearance_Proof_${app.tokenNumber}.pdf`,
              fileSize: 248560,
              mimeType: 'application/pdf',
              status: 'verified',
              uploadedAt: now,
              docType: 'CERTIFICATE',
            };
            updatedDocs.push(certDoc);

            notifications.unshift({
              id: generateId('NTF'),
              userId: app.citizenId,
              title: 'Land Ownership Proof Document Issued',
              message: `Tahsildar ${officerName} has finalized your case (${app.tokenNumber}). All departments have approved. Your official certified land ownership proof & dispute resolution order is now issued to you.`,
              applicationId: app.id,
              tokenNumber: app.tokenNumber,
              isRead: false,
              createdAt: now,
            });
          }

          // Notify citizen of regular workflow updates
          notifications.unshift({
            id: generateId('NTF'),
            userId: app.citizenId,
            title: action === 'APPROVE' 
              ? (nextStatus === 'COMPLETED' ? 'Application Fully Approved & Certified' : `Approved by ${department}`)
              : action === 'CORRECTION' ? `Action Required by ${department}`
              : `Application Rejected by ${department}`,
            message: historyRemarks,
            applicationId,
            tokenNumber: app.tokenNumber,
            isRead: false,
            createdAt: now,
          });

          // If moved to next department, alert next department officers
          if (action === 'APPROVE' && nextStageIndex > curIdx && nextStageIndex < stages.length) {
            const nextStage = stages[nextStageIndex];
            notifications.unshift({
              id: generateId('NTF'),
              userId: 'OFC-DEPT-' + nextStage.department,
              title: `New Case File Forwarded to ${nextStage.department}`,
              message: `Application ${app.tokenNumber} has been verified by ${department} and is now awaiting ${nextStage.department} review.`,
              applicationId,
              tokenNumber: app.tokenNumber,
              isRead: false,
              createdAt: now,
            });
          }

          const auditLog: AuditLog = {
            id: generateId('AUD'),
            userId: officerId,
            userName: officerName,
            userRole: 'officer',
            action: `WORKFLOW_${action}_${department.toUpperCase().replace(/\s+/g, '_')}`,
            entityType: 'application',
            entityId: applicationId,
            details: `Application ${app.tokenNumber} - ${historyRemarks}`,
            timestamp: now,
          };

          const updatedApp: Application = {
            ...app,
            status: nextStatus,
            currentDepartment: nextDepartment,
            currentStageIndex: nextStageIndex,
            assignedOfficerId: nextAssignedOfficerId,
            assignedOfficerName: nextAssignedOfficerName,
            workflowStages: stages,
            updatedAt: now,
            remarks: historyRemarks,
            certifiedByTahsildar: isFinalClearance ? true : app.certifiedByTahsildar,
            certifiedAt: isFinalClearance ? now : app.certifiedAt,
            certifiedOfficerName: isFinalClearance ? officerName : app.certifiedOfficerName,
            certifiedOrderNumber: isFinalClearance ? `DS-ROR-MAG/${app.tokenNumber.slice(-6)}` : app.certifiedOrderNumber,
          };

          if (isSupabaseConfigured) {
            updateApplicationInSupabase(updatedApp).catch(err => {
              console.warn('[DharaniSetu] Failed background workflow update to Supabase:', err);
            });
          }

          return {
            applications: state.applications.map(a =>
              a.id === applicationId ? updatedApp : a
            ),
            statusHistory: [...state.statusHistory, historyEntry],
            documents: updatedDocs,
            notifications,
            auditLogs: [auditLog, ...state.auditLogs],
          };
        });
      },

      reconcileApplicationDiscrepancy: (applicationId, action, officerNotes, changedBy, changedByName) => {
        const now = new Date().toISOString();
        set(state => {
          const app = state.applications.find(a => a.id === applicationId);
          if (!app) return state;

          const newStatus: ApplicationStatus = action === 'APPROVE_ADJUSTED'
            ? 'APPROVED'
            : action === 'REQUEST_RESURVEY'
            ? 'FIELD_VERIFICATION'
            : 'REJECTED';

          const reconStatus: 'PENDING' | 'RECONCILED' | 'RESURVEY_REQUESTED' =
            action === 'APPROVE_ADJUSTED'
              ? 'RECONCILED'
              : action === 'REQUEST_RESURVEY'
              ? 'RESURVEY_REQUESTED'
              : 'PENDING';

          const remarks = action === 'APPROVE_ADJUSTED'
            ? `Tahsildar reconciliation approved with adjusted area: ${app.aiDiscrepancy?.surveyArea || app.formData.surveyArea || '0.90'} Acres. Notes: ${officerNotes}`
            : action === 'REQUEST_RESURVEY'
            ? `Physical differential GPS resurvey ordered. Reason: ${officerNotes}`
            : `Application rejected due to irreconcilable cadastral discrepancy: ${officerNotes}`;

          const historyEntry: ApplicationStatusHistory = {
            id: generateId('HST'),
            applicationId,
            status: newStatus,
            changedBy,
            changedByName,
            remarks,
            timestamp: now,
          };

          const notifications = [...state.notifications];
          notifications.unshift({
            id: generateId('NTF'),
            userId: app.citizenId,
            title: `Discrepancy Scrutiny Decision: ${action.replace(/_/g, ' ')}`,
            message: `Tahsildar ${changedByName} reviewed the area discrepancy for ${app.tokenNumber}. ${remarks}`,
            applicationId,
            tokenNumber: app.tokenNumber,
            isRead: false,
            createdAt: now,
          });

          const auditLog: AuditLog = {
            id: generateId('AUD'),
            userId: changedBy,
            userName: changedByName,
            userRole: 'officer',
            action: `DISCREPANCY_${action}`,
            entityType: 'application',
            entityId: applicationId,
            details: `Tahsildar executed ${action} on ${app.tokenNumber}. ${remarks}`,
            timestamp: now,
          };

          const updatedDiscrepancy = app.aiDiscrepancy
            ? { ...app.aiDiscrepancy, reconciliationStatus: reconStatus, officerNotes }
            : undefined;

          const updatedApp: Application = {
            ...app,
            status: newStatus,
            updatedAt: now,
            remarks,
            aiDiscrepancy: updatedDiscrepancy,
          };

          if (isSupabaseConfigured) {
            updateApplicationInSupabase(updatedApp).catch(err => {
              console.warn('[DharaniSetu] Failed background update to Supabase:', err);
            });
          }

          return {
            applications: state.applications.map(a =>
              a.id === applicationId ? updatedApp : a
            ),
            statusHistory: [...state.statusHistory, historyEntry],
            notifications,
            auditLogs: [auditLog, ...state.auditLogs],
          };
        });
      },

      addDocument: (doc) => {
        set(state => ({
          documents: [...state.documents, {
            ...doc,
            id: generateId('DOC'),
            status: 'pending',
            uploadedAt: new Date().toISOString(),
          }],
        }));
      },

      verifyDocument: (docId, status) => {
        set(state => ({
          documents: state.documents.map(d =>
            d.id === docId ? { ...d, status } : d
          ),
        }));
      },

      getApplicationById: (id) => {
        const app = get().applications.find(a => a.id === id);
        if (!app) return undefined;
        if (!app.workflowStages || app.workflowStages.length === 0) {
          const configs = SERVICE_WORKFLOW_MAP[app.serviceType] || SERVICE_WORKFLOW_MAP.mutation;
          const stages: WorkflowStage[] = configs.map((c, idx) => ({
            id: `STG-${idx + 1}-${app.id}`,
            department: c.department,
            roleName: c.roleName,
            officialTitle: c.officialTitle,
            description: c.description,
            documentsVerified: c.documentsVerified,
            status: idx === 0 ? 'IN_PROGRESS' : 'PENDING',
            slaDays: c.slaDays,
          }));
          return {
            ...app,
            currentDepartment: app.currentDepartment || stages[0].department,
            currentStageIndex: app.currentStageIndex ?? 0,
            workflowStages: stages,
          };
        }
        return app;
      },
      getApplicationByToken: (token) => {
        const app = get().applications.find(a => a.tokenNumber === token);
        if (!app) return undefined;
        if (!app.workflowStages || app.workflowStages.length === 0) {
          const configs = SERVICE_WORKFLOW_MAP[app.serviceType] || SERVICE_WORKFLOW_MAP.mutation;
          const stages: WorkflowStage[] = configs.map((c, idx) => ({
            id: `STG-${idx + 1}-${app.id}`,
            department: c.department,
            roleName: c.roleName,
            officialTitle: c.officialTitle,
            description: c.description,
            documentsVerified: c.documentsVerified,
            status: idx === 0 ? 'IN_PROGRESS' : 'PENDING',
            slaDays: c.slaDays,
          }));
          return {
            ...app,
            currentDepartment: app.currentDepartment || stages[0].department,
            currentStageIndex: app.currentStageIndex ?? 0,
            workflowStages: stages,
          };
        }
        return app;
      },
      getApplicationsForCitizen: (citizenId, email, name) =>
        get().applications.filter(a => {
          if (a.citizenId === citizenId) return true;
          if (email && a.citizenEmail && a.citizenEmail.toLowerCase() === email.toLowerCase()) return true;
          if (name && a.citizenName && a.citizenName.toLowerCase() === name.toLowerCase()) return true;
          return false;
        }).sort(
          (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        ),
      
      // Dynamic officer routing: Returns applications assigned to officer OR in their jurisdiction & matching current department
      getApplicationsForOfficer: (officerId) => {
        // Master Control for National Admin
        if (officerId === 'ADM-001' || officerId.startsWith('ADM')) {
          return get().applications.sort(
            (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
          );
        }
        const officer = DEMO_OFFICERS.find(o => o.id === officerId);
        return get().applications.filter(a => {
          if (a.assignedOfficerId === officerId) return true;
          // If officer has a department, check if application is at officer's department desk or touched by their department
          if (officer) {
            const mandalMatch = !officer.jurisdictionMandal || a.mandalId === officer.jurisdictionMandal || a.mandalName === officer.jurisdictionMandal || a.stateId === officer.jurisdictionState;
            const currentDept = a.currentDepartment || (a.workflowStages?.[0]?.department) || 'Revenue';
            const isAtOfficerDesk = currentDept.toLowerCase() === officer.department.toLowerCase();
            const wasTouchedByOfficerDept = a.workflowStages?.some(s => s.department.toLowerCase() === officer.department.toLowerCase());

            if (mandalMatch && (isAtOfficerDesk || wasTouchedByOfficerDept)) return true;
          }
          return false;
        }).sort(
          (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        );
      },

      getStatusHistory: (applicationId) =>
        get().statusHistory
          .filter(h => h.applicationId === applicationId)
          .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
      getDocuments: (applicationId) =>
        get().documents.filter(d => d.applicationId === applicationId),
      getNotifications: (userId) =>
        get().notifications
          .filter(n => n.userId === userId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),

      markNotificationRead: (id) => {
        set(state => ({
          notifications: state.notifications.map(n =>
            n.id === id ? { ...n, isRead: true } : n
          ),
        }));
      },

      markAllNotificationsRead: (userId) => {
        set(state => ({
          notifications: state.notifications.map(n =>
            n.userId === userId ? { ...n, isRead: true } : n
          ),
        }));
      },

      getAuditLogs: () =>
        [...get().auditLogs].sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ),

      addAuditLog: (log) => {
        set(state => ({
          auditLogs: [{
            ...log,
            id: generateId('AUD'),
            timestamp: new Date().toISOString(),
          }, ...state.auditLogs],
        }));
      },

      addNotification: (notif) => {
        set(state => ({
          notifications: [{
            ...notif,
            id: generateId('NTF'),
            isRead: false,
            createdAt: new Date().toISOString(),
          }, ...state.notifications],
        }));
      },

      seedDemoApplications: (_citizenId) => {
        // Mock seed applications removed per user requirement. Real applications flow from Supabase.
      },
    }),
    {
      name: 'dharanisetu-app-v5',
      partialize: (state) => ({
        notifications: state.notifications,
        auditLogs: state.auditLogs,
      }),
    }
  )
);

// Clean up any legacy localStorage cache from older versions
if (typeof window !== 'undefined') {
  ['dharanisetu-app-v1', 'dharanisetu-app-v2', 'dharanisetu-app-v3', 'dharanisetu-app-v4'].forEach(key => {
    try { localStorage.removeItem(key); } catch (_) {}
  });
}

// Real-time Supabase subscription to receive applications inserted/updated/deleted by citizens and officers
if (typeof window !== 'undefined' && isSupabaseConfigured) {
  try {
    subscribeToApplications(
      (newApp) => {
        useAppStore.setState(state => {
          if (state.applications.some(a => a.id === newApp.id)) {
            return {
              applications: state.applications.map(a => a.id === newApp.id ? newApp : a),
            };
          }
          return {
            applications: [newApp, ...state.applications],
          };
        });
      },
      (updatedApp) => {
        useAppStore.setState(state => ({
          applications: state.applications.map(a => a.id === updatedApp.id ? updatedApp : a),
        }));
      },
      (deletedId) => {
        useAppStore.setState(state => ({
          applications: state.applications.filter(a => a.id !== deletedId),
        }));
      }
    );
  } catch (e) {
    console.warn('[DharaniSetu] Could not initialize realtime subscription:', e);
  }
}
