import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { toast } from '../../components/ui/Toast';
import { formatDate } from '../../utils';
import {
  CheckSquare, ArrowLeft, Map, FileText, User,
  Clock, ShieldCheck, AlertTriangle, ThumbsUp, ThumbsDown,
  Info, CheckCircle2, MessageSquare, Download, Lock, Eye
} from 'lucide-react';
import { DocumentInspectionModal } from '../../components/documents/DocumentInspectionModal';
import type { OfficerProfile, ApplicationStatus, Document } from '../../types';

export function OfficerApplicationDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const officer = user as OfficerProfile;
  const {
    getApplicationById, getStatusHistory, getDocuments,
    updateApplicationStatus, advanceDepartmentWorkflow, verifyDocument, reconcileApplicationDiscrepancy
  } = useAppStore();

  const application = id ? getApplicationById(id) : undefined;
  const history = id ? getStatusHistory(id) : [];
  const documents = id ? getDocuments(id) : [];

  const [inspectingDoc, setInspectingDoc] = useState<Document | null>(null);
  const [remarks, setRemarks] = useState('');
  const [reconNotes, setReconNotes] = useState('');
  const [docCheck, setDocCheck] = useState(true);
  const [landCheck, setLandCheck] = useState(true);
  const [gisCheck, setGisCheck] = useState(false);
  const [fieldCheck, setFieldCheck] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  if (!application) {
    return (
      <PageLayout role="officer">
        <DemoBanner />
        <PageContent>
          <div className="gov-card text-center py-12">
            <p className="text-sm font-semibold text-brand-navy">Application Not Found</p>
            <button
              onClick={() => navigate('/officer/applications')}
              className="gov-btn-primary text-xs mt-4"
            >
              Back to Queue
            </button>
          </div>
        </PageContent>
      </PageLayout>
    );
  }

  const curStageIdx = application.currentStageIndex ?? 0;
  const stages = application.workflowStages || [];
  const curStage = stages[curStageIdx];
  const nextStage = curStageIdx + 1 < stages.length ? stages[curStageIdx + 1] : null;

  // Strict Department RBAC & Master Control
  const isAdmin = officer?.role === 'admin' || officer?.id === 'ADM-001' || (officer?.id && officer.id.startsWith('ADM'));
  const isTahsildar = Boolean(
    officer?.department?.toLowerCase() === 'tahsildar' ||
    officer?.designation?.toLowerCase().includes('tahsildar')
  );
  const currentStageDepartment = curStage?.department || application.currentDepartment || 'Revenue';
  const sDeptNorm = (currentStageDepartment || '').trim().toLowerCase();
  const oDeptNorm = (officer?.department || '').trim().toLowerCase();

  const isDeskAuthorized = isAdmin || (
    Boolean(officer?.department) && (
      sDeptNorm === oDeptNorm ||
      (sDeptNorm === 'final authority' && (oDeptNorm === 'tahsildar' || oDeptNorm === 'revenue')) ||
      (sDeptNorm === 'tahsildar' && (oDeptNorm === 'final authority' || oDeptNorm === 'revenue')) ||
      (isTahsildar && ['revenue', 'tahsildar', 'final authority'].includes(sDeptNorm))
    )
  );

  // A Tahsildar (Executive Magistrate) has statutory authority to review or reject any application in their Mandal jurisdiction at any stage!
  const canAct = isDeskAuthorized || isTahsildar;

  // Handle multi-department sequential workflow actions
  const handleWorkflowApprove = () => {
    if (!officer) return;
    if (!isDeskAuthorized) {
      toast('error', 'Department Restricted', `Your account (${officer.department}) is not authorized for the ${currentStageDepartment} desk.`);
      return;
    }
    setActionLoading(true);
    const departmentName = currentStageDepartment;
    const finalRemarks = remarks.trim() || `Approved by ${departmentName} (${officer.name}). All statutory verifications satisfied.`;

    advanceDepartmentWorkflow(
      application.id,
      'APPROVE',
      officer.id,
      officer.name,
      departmentName,
      finalRemarks
    );

    if (nextStage) {
      toast('success', 'Forwarded to Next Department', `Approved and routed to ${nextStage.department} (${nextStage.roleName}).`);
    } else {
      toast('success', 'Final Clearance Granted', 'All departmental stages approved. Final statutory order issued.');
    }
    setRemarks('');
    setActionLoading(false);
  };

  const handleWorkflowCorrection = () => {
    if (!officer) return;
    if (!isDeskAuthorized) {
      toast('error', 'Department Restricted', `Your account (${officer.department}) is not authorized for the ${currentStageDepartment} desk.`);
      return;
    }
    if (!remarks.trim()) {
      toast('error', 'Remarks Required', 'Please specify what clarification or document correction the citizen needs to provide.');
      return;
    }
    setActionLoading(true);
    const departmentName = curStage?.department || officer.department || 'Revenue';
    advanceDepartmentWorkflow(
      application.id,
      'CORRECTION',
      officer.id,
      officer.name,
      departmentName,
      remarks.trim()
    );
    toast('info', 'Correction Requested', 'Citizen alerted with departmental directive.');
    setRemarks('');
    setActionLoading(false);
  };

  const handleWorkflowReject = () => {
    if (!officer) return;
    if (!remarks.trim()) {
      toast('error', 'Remarks Required', 'Please provide statutory grounds for rejection.');
      return;
    }
    setActionLoading(true);
    const departmentName = curStage?.department || officer.department || 'Revenue';
    advanceDepartmentWorkflow(
      application.id,
      'REJECT',
      officer.id,
      officer.name,
      departmentName,
      remarks.trim()
    );
    toast('error', 'Application Rejected', 'Citizen notified with stated rejection grounds.');
    setRemarks('');
    setActionLoading(false);
  };

  // Handle status update actions
  const handleAdvanceVerification = (nextStatus: ApplicationStatus, label: string) => {
    if (!officer) return;
    setActionLoading(true);
    updateApplicationStatus(
      application.id,
      nextStatus,
      officer.id,
      officer.name,
      remarks || `${label} completed by ${officer.name} (${officer.designation}).`
    );
    toast('success', 'Status Updated', `Application moved to ${nextStatus.replace(/_/g, ' ')}`);
    setRemarks('');
    setActionLoading(false);
  };

  const handleApprove = () => {
    if (!officer) return;
    setActionLoading(true);
    updateApplicationStatus(
      application.id,
      'APPROVED',
      officer.id,
      officer.name,
      remarks || `Application approved following complete verification by ${officer.name}.`
    );
    toast('success', 'Application Approved', 'Government record update initiated.');
    setRemarks('');
    setActionLoading(false);
  };

  const handleComplete = () => {
    if (!officer) return;
    setActionLoading(true);
    updateApplicationStatus(
      application.id,
      'COMPLETED',
      officer.id,
      officer.name,
      remarks || `Final land record synchronized and service order issued by ${officer.name}.`
    );
    toast('success', 'Service Completed', 'Land records updated in revenue system.');
    setRemarks('');
    setActionLoading(false);
  };

  const handleReject = () => {
    if (!officer) return;
    if (!remarks.trim()) {
      toast('error', 'Remarks Required', 'Please provide reason for rejection.');
      return;
    }
    setActionLoading(true);
    updateApplicationStatus(
      application.id,
      'REJECTED',
      officer.id,
      officer.name,
      remarks
    );
    toast('error', 'Application Rejected', 'Citizen notified with stated rejection grounds.');
    setRemarks('');
    setActionLoading(false);
  };

  const handleRequestInfo = () => {
    if (!officer) return;
    if (!remarks.trim()) {
      toast('error', 'Remarks Required', 'Please specify what additional information is required.');
      return;
    }
    setActionLoading(true);
    updateApplicationStatus(
      application.id,
      'ADDITIONAL_INFORMATION_REQUIRED',
      officer.id,
      officer.name,
      remarks
    );
    toast('info', 'Information Requested', 'Citizen has been alerted to provide more details.');
    setRemarks('');
    setActionLoading(false);
  };

  const handleVerifySingleDoc = (docId: string, status: 'verified' | 'rejected') => {
    verifyDocument(docId, status);
    toast('info', 'Document Updated', `Marked as ${status}`);
  };

  return (
    <PageLayout role="officer">
      <DemoBanner />
      <PageHeader
        title={`Process Application — ${application.tokenNumber}`}
        subtitle={`${application.serviceName} · ${application.mandalName}, ${application.districtName}`}
        breadcrumb={[
          { label: t('nav.home', 'Home') },
          { label: t('nav.applications'), path: '/officer/applications' },
          { label: application.tokenNumber },
        ]}
        action={
          <Link
            to="/officer/applications"
            className="gov-btn-secondary flex items-center gap-1.5 text-xs"
          >
            <ArrowLeft size={14} />
            <span>{t('officer.backToQueue', 'Back to Queue')}</span>
          </Link>
        }
      />

      <PageContent>
        {/* Top Summary Banner */}
        <div className="gov-card bg-brand-navy text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-saffron">{t('appDetail.tokenNumber', 'Token')}</span>
              <StatusBadge status={application.status as ApplicationStatus} />
            </div>
            <h2 className="text-xl font-mono font-bold mt-1">{application.tokenNumber}</h2>
            <p className="text-xs text-white/80 mt-1">
              {t('appDetail.applicantName', 'Applicant')}: <strong className="text-white">{application.citizenName}</strong> ({application.citizenEmail})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/officer/gis?parcel=${application.parcelId}`}
              className="px-4 py-2 rounded bg-brand-green hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Map size={15} />
              <span>{t('officer.openInGis', 'Open in GIS Explorer')}</span>
            </Link>
          </div>
        </div>

        {/* Multi-Department Sequential Approval Card */}
        {stages.length > 0 && (
          <div className="gov-card p-5 border border-slate-200">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-600" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                  Sequential Inter-Departmental Workflow Route
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-500">
                Current Desk: <strong className="text-emerald-700">{application.currentDepartment || officer?.department || 'Revenue'}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
              {stages.map((stg, i) => {
                const isApproved = stg.status === 'APPROVED' || application.status === 'COMPLETED';
                const isCurrent = curStageIdx === i && application.status !== 'COMPLETED';
                const isCorrection = stg.status === 'CORRECTION_REQUIRED';

                return (
                  <div
                    key={stg.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isApproved
                        ? 'bg-emerald-50/70 border-emerald-200'
                        : isCurrent
                        ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-400/20'
                        : isCorrection
                        ? 'bg-amber-50/80 border-amber-300'
                        : 'bg-slate-50 border-slate-200/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Stage {i + 1}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        isApproved
                          ? 'bg-emerald-200 text-emerald-900'
                          : isCurrent
                          ? 'bg-blue-200 text-blue-900 animate-pulse'
                          : isCorrection
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {isApproved ? 'Approved' : isCurrent ? 'Active Desk' : isCorrection ? 'Correction' : 'Pending'}
                      </span>
                    </div>

                    <p className="text-xs font-black text-slate-900 mt-1">
                      {stg.department}
                    </p>
                    <p className="text-[11px] text-slate-600 font-medium leading-tight mt-0.5">
                      {stg.roleName}
                    </p>

                    {stg.actionByName && (
                      <p className="text-[10px] text-emerald-800 font-semibold mt-2 pt-1 border-t border-emerald-200/60">
                        Signed: {stg.actionByName}
                      </p>
                    )}
                    {stg.remarks && (
                      <p className="text-[10px] text-slate-500 italic mt-0.5 line-clamp-2">
                        "{stg.remarks}"
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left / Center: Details, Documents & Checklist */}
          <div className="lg:col-span-2 space-y-4">
            {/* Official Verification Checklist */}
            <div className="gov-card border-t-4 border-t-brand-saffron">
              <div className="flex items-center gap-2 text-brand-navy font-semibold text-sm mb-3 pb-2 border-b border-gov-border">
                <CheckSquare size={16} className="text-brand-saffron" />
                <span>{t('officer.statutoryChecklist', 'Statutory Verification Checklist')}</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded border border-gray-100">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="check-doc"
                      checked={docCheck}
                      onChange={e => setDocCheck(e.target.checked)}
                      className="rounded text-brand-navy focus:ring-brand-navy"
                    />
                    <label htmlFor="check-doc" className="text-xs font-medium text-gray-800 cursor-pointer">
                      {t('officer.docCheckLabel', '1. Document Authenticity Check (Deeds, Pattadar passbook, ID)')}
                    </label>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${docCheck ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'}`}>
                    {docCheck ? t('status.verified', 'VERIFIED') : t('status.pending', 'PENDING')}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded border border-gray-100">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="check-land"
                      checked={landCheck}
                      onChange={e => setLandCheck(e.target.checked)}
                      className="rounded text-brand-navy focus:ring-brand-navy"
                    />
                    <label htmlFor="check-land" className="text-xs font-medium text-gray-800 cursor-pointer">
                      {t('officer.landCheckLabel', '2. Land Revenue & Encumbrance Record Cross-Verification')}
                    </label>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${landCheck ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'}`}>
                    {landCheck ? t('status.verified', 'VERIFIED') : t('status.pending', 'PENDING')}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded border border-gray-100">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="check-gis"
                      checked={gisCheck}
                      onChange={e => setGisCheck(e.target.checked)}
                      className="rounded text-brand-navy focus:ring-brand-navy"
                    />
                    <label htmlFor="check-gis" className="text-xs font-medium text-gray-800 cursor-pointer">
                      {t('officer.gisCheckLabel', '3. Cadastral GIS & Satellite Boundary Geometry Check')}
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/officer/gis?parcel=${application.parcelId}`} className="text-[10px] text-blue-600 hover:underline">
                      {t('officer.openInGis', 'Verify Map')}
                    </Link>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${gisCheck ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'}`}>
                      {gisCheck ? t('status.verified', 'VERIFIED') : t('status.pending', 'PENDING')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded border border-gray-100">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="check-field"
                      checked={fieldCheck}
                      onChange={e => setFieldCheck(e.target.checked)}
                      className="rounded text-brand-navy focus:ring-brand-navy"
                    />
                    <label htmlFor="check-field" className="text-xs font-medium text-gray-800 cursor-pointer">
                      {t('officer.fieldCheckLabel', '4. Physical Field Inspection & Boundary Peg Demarcation')}
                    </label>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${fieldCheck ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'}`}>
                    {fieldCheck ? t('status.verified', 'VERIFIED') : t('status.pending', 'PENDING')}
                  </span>
                </div>
              </div>
            </div>

            {/* Land Information */}
            <div className="gov-card">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gov-border">
                <div className="flex items-center gap-2 text-brand-navy font-semibold text-sm">
                  <Map size={16} className="text-brand-green" />
                  <span>{t('appDetail.landParcelDetails', 'Land Parcel Details')}</span>
                </div>
                <Link
                  to={`/officer/gis?parcel=${application.parcelId}`}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium"
                >
                  <span>{t('appDetail.viewOnGis', 'View on GIS Map')}</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-brand-muted uppercase text-[10px]">{t('profile.surveyNo', 'Survey No')}</span>
                  <p className="font-semibold text-brand-navy">{application.surveyNumber}</p>
                </div>
                <div>
                  <span className="text-brand-muted uppercase text-[10px]">{t('appDetail.village', 'Village')}</span>
                  <p className="font-semibold text-brand-navy">{application.village}</p>
                </div>
                <div>
                  <span className="text-brand-muted uppercase text-[10px]">{t('appDetail.mandal', 'Mandal')}</span>
                  <p className="font-semibold text-brand-navy">{application.mandalName}</p>
                </div>
                <div>
                  <span className="text-brand-muted uppercase text-[10px]">{t('track.districtState', 'District & State')}</span>
                  <p className="font-semibold text-brand-navy">{application.districtName}, {application.stateName}</p>
                </div>
              </div>

              {application.formData && (
                <div className="mt-3 pt-3 border-t border-gov-border text-xs">
                  <span className="text-brand-muted uppercase text-[10px] block mb-1">{t('appDetail.appPurposeNotes', 'Application Purpose / Notes')}</span>
                  <p className="p-2.5 bg-gray-50 rounded border border-gray-100 text-gray-700 leading-relaxed">
                    {application.formData.purpose || t('appDetail.standardSubmission', 'Standard application submission.')}
                  </p>
                </div>
              )}
            </div>

            {/* AI Document & Cadastral Area Discrepancy Analyzer */}
            <div className="gov-card border-2 border-amber-300 bg-amber-50/30 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-amber-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                      <span>AI Document & Cadastral Discrepancy Scrutiny</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-200 text-amber-900 uppercase">
                        AI Flagged
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500">Automated Sale Deed OCR vs. Satellite Cadastral Survey polygon</p>
                  </div>
                </div>
              </div>

              {/* Extent Comparison Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Deed Extracted Extent</span>
                  <p className="text-base font-black text-slate-900 mt-0.5">
                    {application.aiDiscrepancy?.deedArea || application.formData.deedArea || '1.00'} Acres
                  </p>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {Math.round(parseFloat(application.aiDiscrepancy?.deedArea?.toString() || application.formData.deedArea || '1.0') * 43560).toLocaleString('en-IN')} sq.ft
                  </span>
                  <span className="text-[10px] text-blue-600 font-bold block mt-1">Source: Sale Deed OCR</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Cadastral Survey Extent</span>
                  <p className="text-base font-black text-emerald-800 mt-0.5">
                    {application.aiDiscrepancy?.surveyArea || application.formData.surveyArea || '0.90'} Acres
                  </p>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {Math.round(parseFloat(application.aiDiscrepancy?.surveyArea?.toString() || application.formData.surveyArea || '0.9') * 43560).toLocaleString('en-IN')} sq.ft
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold block mt-1">Source: GeoJSON Cadastral GIS</span>
                </div>

                <div className="p-3 bg-amber-100/70 rounded-xl border border-amber-300 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">Variance Detected</span>
                  <p className="text-base font-black text-amber-900 mt-0.5">
                    {application.aiDiscrepancy?.variancePercent || -10.0}%
                  </p>
                  <span className="text-[11px] text-amber-900 font-medium">
                    Variance: -0.10 Acre (-4,356 sq.ft)
                  </span>
                  <span className="text-[10px] text-rose-700 font-bold block mt-1">Physical Verification Needed</span>
                </div>
              </div>

              {/* Status or Reconciliation Action */}
              {application.aiDiscrepancy?.reconciliationStatus === 'RECONCILED' ? (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-emerald-900">Area Reconciled & Endorsed by Tahsildar</p>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      {application.aiDiscrepancy.officerNotes || 'Tahsildar approved adjusted cadastral extent matching ground survey.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-white rounded-xl border border-amber-200 space-y-3">
                  <div>
                    <label className="gov-label text-xs">
                      {t('officer.reconcileDirective', 'Tahsildar Ground Verification Findings & Reconciliation Directive *')}
                    </label>
                    <textarea
                      className="gov-input text-xs h-16 resize-none"
                      placeholder="e.g. Ground survey verified boundary stones match 0.90 acres. 0.10 acre was acquired for road widening as per Gazette. Title endorsed for 0.90 acres."
                      value={reconNotes}
                      onChange={e => setReconNotes(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        reconcileApplicationDiscrepancy(
                          application.id,
                          'APPROVE_ADJUSTED',
                          reconNotes || 'Tahsildar field check verified 0.90 acres. Title approved with adjusted extent.',
                          officer.id,
                          officer.name
                        );
                        toast('success', 'Discrepancy Reconciled & Approved', 'Approved with adjusted cadastral area (0.90 Acres).');
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={14} />
                      <span>{t('officer.verifyApproveAdjusted', 'Verify & Approve Adjusted Extent (0.90 Ac)')}</span>
                    </button>
                    <button
                      onClick={() => {
                        reconcileApplicationDiscrepancy(
                          application.id,
                          'REQUEST_RESURVEY',
                          reconNotes || 'Differential GPS survey ordered due to ambiguous boundary lines.',
                          officer.id,
                          officer.name
                        );
                        toast('info', 'Resurvey Ordered', 'Application routed to Survey Department for DGPS demarcation.');
                      }}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <Info size={14} />
                      <span>{t('officer.orderDgpsResurvey', 'Order DGPS Resurvey')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Documents with inline verification */}
            <div className="gov-card">
              <div className="flex items-center gap-2 text-brand-navy font-semibold text-sm mb-3 pb-2 border-b border-gov-border">
                <FileText size={16} className="text-blue-600" />
                <span>Uploaded Documents ({documents.length})</span>
              </div>

              <div className="space-y-2">
                {documents.map(doc => (
                  <div
                    key={doc.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-gray-50 rounded border border-gov-border"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-brand-navy flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-brand-navy">{doc.name}</p>
                        <p className="text-[11px] text-brand-muted">{doc.fileName} · {(doc.fileSize / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                          doc.status === 'verified'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : doc.status === 'rejected'
                            ? 'bg-red-100 text-red-800 border border-red-200'
                            : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        }`}
                      >
                        {t(`status.${doc.status}`, doc.status.toUpperCase())}
                      </span>

                      {/* Open Document to Inspect before Verifying / Rejecting */}
                      <button
                        onClick={() => setInspectingDoc(doc)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                        title="Open and Inspect Document"
                      >
                        <Eye size={14} />
                        <span>Open & Inspect</span>
                      </button>

                      {/* Quick inline status buttons (still available or actionable from modal) */}
                      {doc.status !== 'verified' && (
                        <button
                          onClick={() => setInspectingDoc(doc)}
                          className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs font-bold transition-all cursor-pointer"
                          title="Open document to verify"
                        >
                          {t('officer.verify', 'Verify')}
                        </button>
                      )}
                      {doc.status !== 'rejected' && (
                        <button
                          onClick={() => setInspectingDoc(doc)}
                          className="px-2.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-all cursor-pointer"
                          title="Open document to reject"
                        >
                          {t('officer.reject', 'Reject')}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Officer Action Panel & Timeline */}
          <div className="space-y-4">
            {/* Officer Action Panel */}
            <div className="gov-card border-t-4 border-t-brand-navy">
              <div className="flex items-center gap-2 text-brand-navy font-semibold text-sm mb-3 pb-2 border-b border-gov-border">
                <ShieldCheck size={16} className="text-brand-navy" />
                <span>{t('officer.actions', 'Officer Administrative Action')}</span>
              </div>

              <div className="space-y-3">
                {isAdmin && (
                  <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 flex items-start gap-2.5 mb-3">
                    <ShieldCheck size={18} className="text-purple-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-purple-950">Administrator Master Control</p>
                      <p className="text-[11px] text-purple-700 leading-snug">
                        National statutory override active. You have full jurisdiction clearance authority across all departmental desks.
                      </p>
                    </div>
                  </div>
                )}

                {application.status === 'REJECTED' ? (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-left space-y-3">
                    <div className="flex items-center gap-2 text-rose-900 font-bold text-xs">
                      <ThumbsDown size={16} className="text-rose-700" />
                      <span>{t('officer.appRejectedDisposed', 'Application Formally Rejected & Disposed')}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-rose-200 text-xs space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">{t('common.status', 'Status')}:</span>
                        <span className="font-bold text-rose-700 uppercase">{t('status.REJECTED', 'Rejected')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">{t('common.disposedAt', 'Disposed On')}:</span>
                        <span className="font-mono text-slate-700">{formatDate(application.updatedAt)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">{t('common.activeDesk', 'Stage at Decision')}:</span>
                        <span className="font-bold text-slate-800">{currentStageDepartment} Desk</span>
                      </div>
                    </div>
                    {application.remarks && (
                      <div className="p-3 rounded-xl bg-rose-100/70 border border-rose-200/80 text-xs text-rose-950 space-y-1">
                        <p className="font-bold text-[11px] uppercase tracking-wider text-rose-800">{t('officer.statutoryGrounds', 'Statutory Grounds / Recorded Reason')}:</p>
                        <p className="italic leading-relaxed">"{application.remarks}"</p>
                      </div>
                    )}
                  </div>
                ) : canAct ? (
                  <>
                    {!isDeskAuthorized && isTahsildar && (
                      <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[11px] text-blue-900 flex items-center gap-2">
                        <span className="text-sm">⚖️</span>
                        <span><strong>{t('officer.tahsildarJurisdiction', 'Tahsildar Executive Magistrate Jurisdiction')}:</strong> {t('officer.tahsildarMandalNotice', 'You have statutory supervisory authority to review, request correction, or reject this mandal application.')}</span>
                      </div>
                    )}

                    <div>
                      <label className="gov-label text-xs">{t('officer.remarks', 'Official Remarks / Directive')}</label>
                      <textarea
                        className="gov-input text-xs h-20 resize-none"
                        placeholder={t('officer.remarksPlaceholder', 'Enter verification observations, grounds for approval/rejection, or requirements...')}
                        value={remarks}
                        onChange={e => setRemarks(e.target.value)}
                      />
                    </div>

                    {/* Stepwise progression buttons based on status */}
                    {application.status === 'ROUTED' && isDeskAuthorized && (
                      <button
                        onClick={() => handleAdvanceVerification('DOCUMENT_VERIFICATION', 'Document verification')}
                        disabled={actionLoading}
                        className="gov-btn-primary w-full text-xs"
                      >
                        Start Document Verification
                      </button>
                    )}

                    {application.status === 'DOCUMENT_VERIFICATION' && isDeskAuthorized && (
                      <button
                        onClick={() => handleAdvanceVerification('GIS_VERIFICATION', 'GIS boundary check')}
                        disabled={actionLoading}
                        className="gov-btn-primary w-full text-xs"
                      >
                        Mark Docs Verified → Start GIS Check
                      </button>
                    )}

                    {application.status === 'GIS_VERIFICATION' && isDeskAuthorized && (
                      <button
                        onClick={() => handleAdvanceVerification('FIELD_VERIFICATION', 'Field verification')}
                        disabled={actionLoading}
                        className="gov-btn-primary w-full text-xs"
                      >
                        Mark GIS Verified → Start Field Verification
                      </button>
                    )}

                    {application.status === 'FIELD_VERIFICATION' && isDeskAuthorized && (
                      <button
                        onClick={() => handleAdvanceVerification('OFFICER_REVIEW', 'Officer statutory review')}
                        disabled={actionLoading}
                        className="gov-btn-primary w-full text-xs"
                      >
                        Complete Field Check → Advance to Decision
                      </button>
                    )}

                    {/* Multi-Department Sequential Decision Buttons */}
                    {!['APPROVED', 'REJECTED', 'COMPLETED'].includes(application.status) && (
                      <div className="pt-2 border-t border-gov-border space-y-2">
                        {/* Primary Sequential Approval Action */}
                        <button
                          onClick={handleWorkflowApprove}
                          disabled={actionLoading}
                          className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                        >
                          <ThumbsUp size={14} />
                          <span>
                            {nextStage
                              ? `Approve & Forward to ${nextStage.department}`
                              : 'Grant Final Clearance & Issue Order'}
                          </span>
                        </button>

                        {/* Request Correction from Citizen */}
                        <button
                          onClick={handleWorkflowCorrection}
                          disabled={actionLoading}
                          className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                        >
                          <MessageSquare size={14} />
                          <span>Request Citizen Correction / Info</span>
                        </button>

                        {/* Department / Tahsildar Rejection */}
                        <button
                          onClick={handleWorkflowReject}
                          disabled={actionLoading}
                          className="w-full py-2 px-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                        >
                          <ThumbsDown size={14} />
                          <span>Reject Application</span>
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-left space-y-3">
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                      <Lock size={16} className="text-amber-700" />
                      <span>Department Jurisdiction Restricted</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      This application is currently pending clearance at the <strong className="text-amber-950 font-bold">{currentStageDepartment} Desk</strong> ({curStage?.roleName || currentStageDepartment}).
                    </p>
                    <div className="p-3 rounded-xl bg-white border border-amber-200/80 text-[11px] space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Your Current Login:</span>
                        <span className="font-bold text-slate-900">{officer?.name || 'Officer'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Your Department:</span>
                        <span className="font-bold text-emerald-700">{officer?.department === 'Revenue' ? 'Revenue Officer (VRO)' : (officer?.department || 'Revenue')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Active Clearance Desk:</span>
                        <span className="font-bold text-amber-800">{currentStageDepartment} Desk</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-normal">
                      Under statutory governance protocols, cross-departmental approvals are strictly prohibited. Only officers assigned to <strong>{currentStageDepartment}</strong> or the System Administrator may take action on this file.
                    </p>
                    <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between text-[11px]">
                      <span className="text-amber-800 font-medium">To take action:</span>
                      <button
                        onClick={() => {
                          logout();
                          navigate('/login');
                        }}
                        className="text-emerald-700 hover:text-emerald-800 font-bold underline cursor-pointer bg-transparent border-none p-0"
                      >
                        Log Out & Sign in as {currentStageDepartment} Officer →
                      </button>
                    </div>
                  </div>
                )}

                {application.status === 'APPROVED' && (
                  <div className="p-3 bg-emerald-50 rounded border border-emerald-200">
                    <p className="text-xs font-semibold text-emerald-800">Application Approved</p>
                    <p className="text-[11px] text-emerald-700 mt-1">Ready for land record synchronization.</p>
                    <button
                      onClick={handleComplete}
                      disabled={actionLoading}
                      className="mt-2 w-full py-2 rounded bg-brand-navy hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
                    >
                      Synchronize Records & Issue Certificate
                    </button>
                  </div>
                )}

                {application.status === 'COMPLETED' && (
                  <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-center">
                    <CheckCircle2 size={24} className="text-emerald-700 mx-auto mb-1" />
                    <p className="text-xs font-bold text-emerald-800">Workflow Fully Completed</p>
                    <p className="text-[10px] text-emerald-700 mt-0.5">Records updated across interoperable systems.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="gov-card">
              <div className="flex items-center gap-2 text-brand-navy font-semibold text-sm mb-3 pb-2 border-b border-gov-border">
                <Clock size={16} className="text-brand-orange" />
                <span>{t('nav.auditTrail', 'Workflow Audit Trail')}</span>
              </div>

              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                {history.map((h, idx) => (
                  <div key={h.id} className="relative text-xs">
                    <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-brand-navy bg-white" />
                    <div>
                      <span className="font-bold text-brand-navy font-mono">
                        {t(`status.${h.status}`, h.status.replace(/_/g, ' '))}
                      </span>
                      <p className="text-[10px] text-brand-muted">{formatDate(h.timestamp)}</p>
                      <p className="text-[11px] text-gray-700 mt-1 bg-gray-50 p-2 rounded border border-gray-100">
                        {h.remarks || t('appDetail.systemUpdate', 'Status logged.')}
                      </p>
                      <p className="text-[10px] text-brand-muted mt-0.5">{t('appDetail.statusUpdatedBy', 'By:')} {h.changedByName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Document Inspection & Decision Modal */}
        <DocumentInspectionModal
          document={inspectingDoc}
          application={application}
          isOpen={!!inspectingDoc}
          onClose={() => setInspectingDoc(null)}
          onVerify={(docId) => {
            handleVerifySingleDoc(docId, 'verified');
          }}
          onReject={(docId, reason) => {
            handleVerifySingleDoc(docId, 'rejected');
            if (reason) {
              setRemarks(prev => (prev ? `${prev} | Document Rejected: ${reason}` : `Document Rejected: ${reason}`));
            }
          }}
        />
      </PageContent>
    </PageLayout>
  );
}
