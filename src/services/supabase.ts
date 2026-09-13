import { createClient } from '@supabase/supabase-js';
import type { LandParcel, Application } from '../types';
import { DEMO_PARCELS, SERVICE_WORKFLOW_MAP } from '../data/demoData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Log connectivity state for developer transparency
 */
if (isSupabaseConfigured) {
  console.log('[DharaniSetu] Supabase live connection configured:', supabaseUrl);
} else {
  console.log('[DharaniSetu] Running in prototype mode with persistent local storage backend.');
}

/**
 * Fetch land parcels from Supabase if configured, falling back to DEMO_PARCELS
 */
export async function fetchLandParcels(): Promise<LandParcel[]> {
  if (!isSupabaseConfigured || !supabase) {
    return DEMO_PARCELS;
  }

  try {
    const { data, error } = await supabase
      .from('land_parcels')
      .select('*')
      .order('id', { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.warn('[DharaniSetu] Supabase fetchLandParcels error, using fallback:', error.message);
      return DEMO_PARCELS;
    }

    return data.map((row: any): LandParcel => ({
      id: row.id,
      ulpin: row.ulpin || `ULPIN-${row.id}`,
      surveyNumber: row.survey_number,
      village: row.village,
      mandalId: row.mandal_id,
      mandalName: row.mandal_name,
      districtId: row.district_id,
      districtName: row.district_name,
      stateId: row.state_id,
      stateName: row.state_name,
      area: Number(row.area),
      areaSqft: Number(row.area_sqft),
      recordedOwner: row.recorded_owner,
      landUse: row.land_use,
      masterPlanZone: row.master_plan_zone || 'Mixed-use',
      recordStatus: row.record_status || 'Clear',
      encumbranceStatus: row.encumbrance_status || 'None',
      propertyTaxStatus: row.property_tax_status || 'Paid',
      propertyTaxLastPaid: row.property_tax_last_paid || '2025-03-31',
      utilityConnections: row.utility_connections || { water: true, electricity: true, sewage: false },
      registrationDeedNumber: row.registration_deed_number || `DOC/${row.survey_number}/2018`,
      marketValuePerSqft: Number(row.market_value_per_sqft || 0),
      centroid: row.centroid,
      geometry: row.geometry,
    }));
  } catch (err) {
    console.error('[DharaniSetu] Exception fetching land parcels from Supabase:', err);
    return DEMO_PARCELS;
  }
}

/**
 * Map raw Supabase application row to typed Application model
 */
function mapRowToApplication(row: any): Application {
  const rawFormData = row.form_data || {};
  const {
    _workflowStages,
    _currentDepartment,
    _currentStageIndex,
    _aiDiscrepancy,
    _certifiedByTahsildar,
    _certifiedAt,
    _certifiedOfficerName,
    _certifiedOrderNumber,
    ...cleanFormData
  } = rawFormData;

  // Fallback to standard multi-department workflow stages if not embedded
  let stages = _workflowStages;
  if (!stages || stages.length === 0) {
    const configs = (SERVICE_WORKFLOW_MAP as Record<string, any>)[row.service_type] || [
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
        department: 'Tahsildar',
        roleName: 'Tahsildar & Executive Magistrate',
        officialTitle: 'Tahsildar & Executive Magistrate',
        description: 'Issues statutory decree and updates land ledger',
        documentsVerified: ['Department Clearances'],
        slaDays: 4,
      },
    ];

    stages = configs.map((cfg: any, idx: number) => ({
      id: `STG-${idx + 1}-${row.id}`,
      department: cfg.department,
      roleName: cfg.roleName,
      officialTitle: cfg.officialTitle,
      description: cfg.description,
      documentsVerified: cfg.documentsVerified,
      status: row.status === 'COMPLETED' 
        ? 'APPROVED' 
        : (row.status === 'REJECTED' 
            ? (idx === 0 ? 'REJECTED' : 'PENDING') 
            : (idx === 0 ? 'IN_PROGRESS' : 'PENDING')),
      slaDays: cfg.slaDays,
    }));
  }

  return {
    id: row.id,
    tokenNumber: row.token_number,
    citizenId: row.citizen_id,
    citizenName: row.citizen_name,
    citizenEmail: row.citizen_email,
    serviceId: row.service_id,
    serviceType: row.service_type,
    serviceName: row.service_name,
    parcelId: row.parcel_id,
    surveyNumber: row.survey_number,
    village: row.village,
    mandalId: row.mandal_id,
    mandalName: row.mandal_name,
    districtId: row.district_id,
    districtName: row.district_name,
    stateId: row.state_id,
    stateName: row.state_name,
    assignedOfficerId: row.assigned_officer_id,
    assignedOfficerName: row.assigned_officer_name,
    status: row.status,
    remarks: row.remarks,
    formData: cleanFormData,
    submittedAt: row.submitted_at,
    updatedAt: row.updated_at,
    currentDepartment: _currentDepartment || (row.status === 'COMPLETED' ? 'Final Authority' : stages[0]?.department || 'Revenue'),
    currentStageIndex: _currentStageIndex ?? (row.status === 'COMPLETED' ? stages.length - 1 : 0),
    workflowStages: stages,
    aiDiscrepancy: _aiDiscrepancy || undefined,
    certifiedByTahsildar: _certifiedByTahsildar || (row.status === 'COMPLETED'),
    certifiedAt: _certifiedAt,
    certifiedOfficerName: _certifiedOfficerName,
    certifiedOrderNumber: _certifiedOrderNumber,
  };
}

/**
 * Fetch applications from Supabase if configured, falling back to local list
 */
export async function fetchApplications(fallbackApps: Application[] = []): Promise<Application[]> {
  if (!isSupabaseConfigured || !supabase) {
    return fallbackApps;
  }

  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      console.warn('[DharaniSetu] Supabase fetchApplications error:', error.message);
      return fallbackApps;
    }

    if (!data) return fallbackApps;

    return data.map(mapRowToApplication);
  } catch (err) {
    console.error('[DharaniSetu] Exception fetching applications from Supabase:', err);
    return fallbackApps;
  }
}

/**
 * Save new application to Supabase when live connection exists
 */
export async function insertApplicationToSupabase(application: Application): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;

  try {
    const enrichedFormData = {
      ...(application.formData || {}),
      _workflowStages: application.workflowStages,
      _currentDepartment: application.currentDepartment,
      _currentStageIndex: application.currentStageIndex,
      _aiDiscrepancy: application.aiDiscrepancy,
      _certifiedByTahsildar: application.certifiedByTahsildar,
      _certifiedAt: application.certifiedAt,
      _certifiedOfficerName: application.certifiedOfficerName,
      _certifiedOrderNumber: application.certifiedOrderNumber,
    };

    const { error } = await supabase.from('applications').insert([{
      id: application.id,
      token_number: application.tokenNumber,
      citizen_id: application.citizenId,
      citizen_name: application.citizenName,
      citizen_email: application.citizenEmail,
      service_id: application.serviceId,
      service_type: application.serviceType,
      service_name: application.serviceName,
      parcel_id: application.parcelId,
      survey_number: application.surveyNumber,
      village: application.village,
      mandal_id: application.mandalId,
      mandal_name: application.mandalName,
      district_id: application.districtId,
      district_name: application.districtName,
      state_id: application.stateId,
      state_name: application.stateName,
      assigned_officer_id: application.assignedOfficerId,
      assigned_officer_name: application.assignedOfficerName,
      status: application.status,
      remarks: application.remarks || null,
      form_data: enrichedFormData,
      submitted_at: application.submittedAt,
      updated_at: application.updatedAt,
    }]);

    if (error) {
      console.warn('[DharaniSetu] Could not sync new application to Supabase:', error.message);
    } else {
      console.log('[DharaniSetu] Successfully inserted application into Supabase:', application.tokenNumber);
    }
  } catch (err) {
    console.error('[DharaniSetu] Exception saving application to Supabase:', err);
  }
}

/**
 * Update existing application in Supabase (status, assigned officer, workflow stage, remarks)
 */
export async function updateApplicationInSupabase(application: Application): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;

  try {
    const enrichedFormData = {
      ...(application.formData || {}),
      _workflowStages: application.workflowStages,
      _currentDepartment: application.currentDepartment,
      _currentStageIndex: application.currentStageIndex,
      _aiDiscrepancy: application.aiDiscrepancy,
      _certifiedByTahsildar: application.certifiedByTahsildar,
      _certifiedAt: application.certifiedAt,
      _certifiedOfficerName: application.certifiedOfficerName,
      _certifiedOrderNumber: application.certifiedOrderNumber,
    };

    const { error } = await supabase
      .from('applications')
      .update({
        assigned_officer_id: application.assignedOfficerId,
        assigned_officer_name: application.assignedOfficerName,
        status: application.status,
        remarks: application.remarks || null,
        form_data: enrichedFormData,
        updated_at: application.updatedAt || new Date().toISOString(),
      })
      .eq('id', application.id);

    if (error) {
      console.warn('[DharaniSetu] Failed to update application in Supabase:', error.message);
    } else {
      console.log('[DharaniSetu] Successfully updated application in Supabase:', application.tokenNumber, application.status);
    }
  } catch (err) {
    console.error('[DharaniSetu] Exception updating application in Supabase:', err);
  }
}

/**
 * Subscribe to real-time changes on the applications table
 */
export function subscribeToApplications(
  onInsert: (app: Application) => void,
  onUpdate: (app: Application) => void,
  onDelete?: (id: string) => void
): () => void {
  if (!isSupabaseConfigured || !supabase) {
    return () => {};
  }

  try {
    const channelName = `dharani-apps-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'applications' },
        (payload) => {
          if (payload.new) {
            const app = mapRowToApplication(payload.new);
            onInsert(app);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'applications' },
        (payload) => {
          if (payload.new) {
            const app = mapRowToApplication(payload.new);
            onUpdate(app);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'applications' },
        (payload) => {
          if (payload.old && (payload.old as any).id && onDelete) {
            onDelete((payload.old as any).id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (err) {
    console.warn('[DharaniSetu] Failed to set up Supabase realtime subscription:', err);
    return () => {};
  }
}

