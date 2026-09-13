// ============================================================
// DharaniSetu — All TypeScript Types
// ============================================================

export type Role = 'citizen' | 'officer' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  phone?: string;
  state?: string;
  district?: string;
  mandal?: string;
  passbookNumber?: string;
  aadhaarMasked?: string;
  parcelsCount?: number;
  totalAreaAcres?: number;
  createdAt: string;
}

export interface OfficerProfile extends User {
  officerId: string;
  department: string;
  designation: string;
  jurisdictionState: string;
  jurisdictionDistrict: string;
  jurisdictionMandal: string;
  isActive: boolean;
}

// ---- Jurisdiction ----
export interface State {
  id: string;
  name: string;
  code: string;
}
export interface District {
  id: string;
  name: string;
  stateId: string;
}
export interface Mandal {
  id: string;
  name: string;
  districtId: string;
}

// ---- Land ----
export type LandUse = 'Agricultural' | 'Residential' | 'Commercial' | 'Industrial' | 'Forest' | 'Govt';

export interface LandParcel {
  id: string;
  ulpin: string;
  surveyNumber: string;
  village: string;
  mandalId: string;
  mandalName: string;
  districtId: string;
  districtName: string;
  stateId: string;
  stateName: string;
  area: number;       // acres
  areaSqft: number;
  recordedOwner: string;
  landUse: LandUse;
  masterPlanZone: string;
  recordStatus: 'Clear' | 'Disputed' | 'Encumbered';
  encumbranceStatus: 'None' | 'Mortgaged' | 'Litigation';
  propertyTaxStatus: 'Paid' | 'Due' | 'Overdue';
  propertyTaxLastPaid: string;
  utilityConnections: {
    water: boolean;
    electricity: boolean;
    sewage: boolean;
  };
  registrationDeedNumber: string;
  marketValuePerSqft: number;
  geometry: GeoJSONPolygon;
  centroid: [number, number]; // [lat, lng]
}

export interface GeoJSONPolygon {
  type: 'Polygon';
  coordinates: number[][][];
}

// ---- Services ----
export type ServiceType =
  | 'land_registration'
  | 'mutation'
  | 'land_record_request'
  | 'survey_verification'
  | 'grievance'
  | 'conversion'
  | 'building'
  | 'correction';

export interface Service {
  id: string;
  type: ServiceType;
  name: string;
  nameHi: string;
  nameTe?: string;
  nameTa?: string;
  description: string;
  department: string;
  requiredDocs: string[];
  estimatedDays: number;
  icon: string;
}

// ---- Applications ----
export type ApplicationStatus =
  | 'SUBMITTED'
  | 'ROUTED'
  | 'DOCUMENT_VERIFICATION'
  | 'GIS_VERIFICATION'
  | 'FIELD_VERIFICATION'
  | 'OFFICER_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'RECORD_UPDATE'
  | 'COMPLETED'
  | 'ADDITIONAL_INFORMATION_REQUIRED';

export type WorkflowStageStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'APPROVED'
  | 'REJECTED'
  | 'CORRECTION_REQUIRED';

export interface WorkflowStage {
  id: string;
  department: string;
  roleName: string;
  officialTitle?: string;
  description?: string;
  documentsVerified?: string[];
  status: WorkflowStageStatus;
  slaDays: number;
  actionBy?: string;
  actionByName?: string;
  actionDate?: string;
  remarks?: string;
}

export interface ApplicationDiscrepancy {
  deedArea: number;
  surveyArea: number;
  variancePercent: number;
  flag: string;
  reconciliationStatus?: 'PENDING' | 'RECONCILED' | 'RESURVEY_REQUESTED';
  officerNotes?: string;
}

export interface Application {
  id: string;
  tokenNumber: string;
  citizenId: string;
  citizenName: string;
  citizenEmail: string;
  serviceId: string;
  serviceType: ServiceType;
  serviceName: string;
  parcelId: string;
  surveyNumber: string;
  village: string;
  mandalId: string;
  mandalName: string;
  districtId: string;
  districtName: string;
  stateId: string;
  stateName: string;
  assignedOfficerId?: string;
  assignedOfficerName?: string;
  status: ApplicationStatus;
  remarks?: string;
  formData: Record<string, string>;
  submittedAt: string;
  updatedAt: string;
  aiDiscrepancy?: ApplicationDiscrepancy;
  // Multi-Department Workflow Fields
  currentDepartment?: string;
  currentStageIndex?: number;
  workflowStages?: WorkflowStage[];
  // Tahsildar Official Certified Document
  certifiedByTahsildar?: boolean;
  certifiedAt?: string;
  certifiedOfficerName?: string;
  certifiedOrderNumber?: string;
}

export interface ApplicationStatusHistory {
  id: string;
  applicationId: string;
  status: ApplicationStatus;
  changedBy: string;
  changedByName: string;
  remarks?: string;
  timestamp: string;
}

export interface Document {
  id: string;
  applicationId: string;
  name: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: string;
  docType?: string;
  fileData?: string; // base64 or data URL / sample preview URL
}

// ---- Notifications ----
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  applicationId?: string;
  tokenNumber?: string;
  isRead: boolean;
  createdAt: string;
}

// ---- Audit ----
export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: Role;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  timestamp: string;
}

// ---- Verification ----
export interface VerificationItem {
  key: string;
  label: string;
  status: 'pending' | 'verified' | 'rejected';
  verifiedBy?: string;
  verifiedAt?: string;
}
