import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { TahsildarLandOwnershipCertificateModal } from '../../components/documents/TahsildarLandOwnershipCertificateModal';
import { formatDate } from '../../utils';
import {
  Search, CheckCircle2, ArrowRight, ArrowLeft,
  Building2, Calendar, Clock, Info, User, Check, ShieldCheck,
  FileCheck, MapPin, AlertCircle, Sparkles, ExternalLink, HelpCircle,
  Award, FileText, Download
} from 'lucide-react';
import { DEMO_OFFICERS, SERVICE_WORKFLOW_MAP } from '../../data/demoData';
import type { ApplicationStatus, WorkflowStage } from '../../types';

export function TrackApplicationPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { getApplicationByToken, getStatusHistory } = useAppStore();
  const { user } = useAuthStore();

  const queryToken = params.get('token') || '';
  const [searchToken, setSearchToken] = useState(queryToken || 'DS-AP-2026-000124');
  const [searched, setSearched] = useState(true);
  const [showCertModal, setShowCertModal] = useState(false);

  useEffect(() => {
    if (queryToken) {
      setSearchToken(queryToken);
      setSearched(true);
    }
  }, [queryToken]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchToken.trim()) return;
    setParams({ token: searchToken.trim() });
    setSearched(true);
  };

  const app = searchToken ? getApplicationByToken(searchToken.trim()) : undefined;
  const history = app ? getStatusHistory(app.id) : [];

  // Guarantee service-specific multi-department workflow stages are present
  const stages: WorkflowStage[] = app?.workflowStages && app.workflowStages.length > 0
    ? app.workflowStages
    : (SERVICE_WORKFLOW_MAP[app?.serviceType || 'mutation'] || []).map((c, idx) => ({
        id: `STG-${idx + 1}`,
        department: c.department,
        roleName: c.roleName,
        officialTitle: c.officialTitle,
        description: c.description,
        documentsVerified: c.documentsVerified,
        status: idx === 0 ? ('IN_PROGRESS' as const) : ('PENDING' as const),
        slaDays: c.slaDays,
      }));

  const isCompleted = app?.status === 'COMPLETED';
  const curStageIdx = app?.currentStageIndex ?? 0;
  const activeStage = stages[curStageIdx];

  // Map each department to its primary assigned demo officer
  const getCurrentOfficer = () => {
    if (!app) return null;
    if (app.assignedOfficerId) {
      const found = DEMO_OFFICERS.find(o => o.id === app.assignedOfficerId);
      if (found) return found;
    }
    const curDept = activeStage?.department || app.currentDepartment || 'Revenue';
    const deptOfficer = DEMO_OFFICERS.find(o => o.department === curDept && o.jurisdictionMandal === app.mandalId)
      || DEMO_OFFICERS.find(o => o.department === curDept)
      || DEMO_OFFICERS[0];
    return deptOfficer;
  };

  const currentOfficer = getCurrentOfficer();

  // Build the complete sequential journey nodes:
  // Node 0: Citizen Submission
  // Nodes 1..N: Department Clearances
  // Node N+1: Final Statutory Sanction
  const totalStagesCount = stages.length;
  const approvedStagesCount = stages.filter(s => s.status === 'APPROVED').length;
  
  // Progress percent calculation:
  // Node 0 (Submitted) is always 1 completed point.
  // Then each approved department stage adds 1 point.
  // Final decision adds 1 point if completed.
  const totalJourneySteps = totalStagesCount + 2; // Submission + Dept Stages + Final Order
  const completedJourneySteps = 1 + approvedStagesCount + (isCompleted ? 1 : 0);
  const progressPercent = isCompleted
    ? 100
    : Math.min(100, Math.max(0, (completedJourneySteps - 0.5) / (totalJourneySteps - 1) * 100));

  const getDeptColor = (dept: string) => {
    switch (dept.toLowerCase()) {
      case 'revenue':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-800',
          border: 'border-blue-200',
          badge: 'bg-blue-100 text-blue-900 border-blue-200',
          accent: 'text-blue-600',
        };
      case 'survey':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-800',
          border: 'border-emerald-200',
          badge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
          accent: 'text-emerald-600',
        };
      case 'town planning':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-900',
          border: 'border-amber-200',
          badge: 'bg-amber-100 text-amber-950 border-amber-200',
          accent: 'text-amber-600',
        };
      case 'registration':
        return {
          bg: 'bg-indigo-50',
          text: 'text-indigo-800',
          border: 'border-indigo-200',
          badge: 'bg-indigo-100 text-indigo-900 border-indigo-200',
          accent: 'text-indigo-600',
        };
      case 'final authority':
      case 'tahsildar':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-800',
          border: 'border-purple-200',
          badge: 'bg-purple-100 text-purple-900 border-purple-200',
          accent: 'text-purple-600',
        };
      default:
        return {
          bg: 'bg-slate-50',
          text: 'text-slate-800',
          border: 'border-slate-200',
          badge: 'bg-slate-100 text-slate-900 border-slate-200',
          accent: 'text-slate-600',
        };
    }
  };

  return (
    <PageLayout role="citizen">
      <DemoBanner />
      <PageHeader
        title={t('track.title', 'Track Your Application')}
        subtitle={t('track.subtitle', 'Dynamic multi-department statutory verification timeline based on requested service')}
        breadcrumb={[{ label: t('nav.home', 'Home'), path: '/' }, { label: t('application.track', 'Track') }]}
      />

      <PageContent>
        {/* Search Bar */}
        <div className="gov-card max-w-3xl mx-auto shadow-sm">
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="gov-label text-slate-800 text-xs font-bold">
              {t('track.searchLabel', 'Search by Application Number / Token')}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tracking-wider"
                  placeholder="e.g. DS-AP-2026-000124"
                  value={searchToken}
                  onChange={e => setSearchToken(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="gov-btn-primary flex items-center gap-1.5 px-6 rounded-xl text-sm"
              >
                <span>{t('track.searchBtn', 'Track')}</span>
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 font-medium pt-1">
              <span>Try test services:</span>
              <button
                type="button"
                onClick={() => { setSearchToken('DS-AP-2026-000124'); setParams({ token: 'DS-AP-2026-000124' }); setSearched(true); }}
                className="text-emerald-700 hover:underline font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
              >
                DS-AP-2026-000124 (Mutation)
              </button>
              <button
                type="button"
                onClick={() => { setSearchToken('DS-AP-2026-000189'); setParams({ token: 'DS-AP-2026-000189' }); setSearched(true); }}
                className="text-blue-700 hover:underline font-mono font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200"
              >
                DS-AP-2026-000189 (Registration)
              </button>
              <button
                type="button"
                onClick={() => { setSearchToken('DS-AP-2026-000210'); setParams({ token: 'DS-AP-2026-000210' }); setSearched(true); }}
                className="text-purple-700 hover:underline font-mono font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200"
              >
                DS-AP-2026-000210 (Building NOC - 4 Depts)
              </button>
              <button
                type="button"
                onClick={() => { setSearchToken('DS-AP-2026-000450'); setParams({ token: 'DS-AP-2026-000450' }); setSearched(true); }}
                className="text-amber-800 hover:underline font-mono font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
              >
                DS-AP-2026-000450 (Grievance Completed Proof)
              </button>
            </div>
          </form>
        </div>

        {/* Not Found alert */}
        {searched && !app && (
          <div className="gov-card max-w-3xl mx-auto text-center py-10">
            <p className="text-base font-bold text-slate-800">{t('track.noAppLocated', 'No application located')}</p>
            <p className="text-xs text-slate-500 mt-1">{t('track.checkAppNumber', 'Please check the application number and try again.')}</p>
          </div>
        )}

        {/* Application Progress Screen */}
        {app && (
          <div className="max-w-4xl mx-auto space-y-5">
            {/* Header with Back link, title & status pill */}
            <div className="gov-card p-6 border border-slate-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span>{t('track.back', 'Back')}</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
                    Single Case File:
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                    {isCompleted
                      ? t('status.COMPLETED', 'Completed · Order Issued')
                      : app.status === 'APPROVED'
                      ? t('status.APPROVED', 'Approved')
                      : `${activeStage?.department || 'Revenue'} Verification Desk`}
                  </span>
                </div>
              </div>

              {/* Title row */}
              <div className="flex items-center gap-4 mt-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Building2 size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {app.serviceName}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                      {stages.length} Statutory Depts
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-mono font-semibold text-slate-500 mt-0.5">
                    {t('common.tokenNumber', 'Application No.')} {app.tokenNumber}
                  </p>
                </div>
              </div>

              {/* Dynamic Multi-Department Sequential Stepper */}
              <div className="mt-8 pt-4 overflow-x-auto pb-4">
                <div className="min-w-[780px] flex items-start justify-between relative px-6">
                  {/* Background connecting track */}
                  <div className="absolute left-10 right-10 top-5 h-1 bg-slate-200 -z-0" />
                  
                  {/* Filled active connecting track */}
                  <div
                    className="absolute left-10 top-5 h-1 bg-emerald-600 -z-0 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />

                  {/* Step 0: Citizen Submission (Always Completed) */}
                  <div className="flex flex-col items-center relative z-10 w-36 text-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs bg-emerald-600 text-white shadow-sm ring-4 ring-emerald-50">
                      <Check size={18} />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full mt-2.5 bg-slate-100 text-slate-800 border border-slate-200">
                      Applicant
                    </span>
                    <p className="text-xs mt-1.5 font-bold leading-snug text-slate-900 px-1">
                      e-Filing Submitted
                    </p>
                    <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                      Completed
                    </p>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      {formatDate(app.submittedAt)}
                    </span>
                  </div>

                  {/* Steps 1..N: Dynamic Department Desks based strictly on requested service */}
                  {stages.map((stage, idx) => {
                    const isStageApproved = stage.status === 'APPROVED' || isCompleted;
                    const isStageCurrent = curStageIdx === idx && !isCompleted;
                    const isCorrection = stage.status === 'CORRECTION_REQUIRED';
                    const isRejected = stage.status === 'REJECTED';
                    const deptColors = getDeptColor(stage.department);

                    return (
                      <div key={stage.id} className="flex flex-col items-center relative z-10 w-36 text-center">
                        {/* Circle node */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${
                            isRejected
                              ? 'bg-rose-600 text-white'
                              : isCorrection
                              ? 'bg-amber-500 text-white ring-4 ring-amber-100'
                              : isStageApproved
                              ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                              : isStageCurrent
                              ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse'
                              : 'bg-white border-2 border-slate-300 text-slate-400'
                          }`}
                        >
                          {isStageApproved ? (
                            <Check size={18} />
                          ) : isRejected ? (
                            '✕'
                          ) : isCorrection ? (
                            '!'
                          ) : (
                            <span>{idx + 2}</span>
                          )}
                        </div>

                        {/* Department Badge */}
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full mt-2.5 border ${
                          isStageApproved
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-200'
                            : isStageCurrent
                            ? deptColors.badge
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                          {stage.department}
                        </span>

                        {/* Role Name */}
                        <p className={`text-xs mt-1.5 font-bold leading-snug px-1 line-clamp-2 ${
                          isStageApproved || isStageCurrent ? 'text-slate-900' : 'text-slate-400'
                        }`}>
                          {stage.roleName}
                        </p>

                        {/* Status Label */}
                        <p className="text-[11px] font-semibold mt-0.5">
                          {isStageApproved ? (
                            <span className="text-emerald-700 font-bold">Approved</span>
                          ) : isStageCurrent ? (
                            <span className="text-blue-700 font-bold">In Progress</span>
                          ) : isCorrection ? (
                            <span className="text-amber-700 font-bold">Correction</span>
                          ) : isRejected ? (
                            <span className="text-rose-700 font-bold">Rejected</span>
                          ) : (
                            <span className="text-slate-400">Pending</span>
                          )}
                        </p>

                        {/* Officer name note */}
                        {stage.actionByName ? (
                          <span className="text-[10px] text-emerald-800 font-medium mt-0.5 line-clamp-1">
                            By {stage.actionByName}
                          </span>
                        ) : isStageCurrent ? (
                          <span className="text-[10px] text-blue-700 font-medium mt-0.5 line-clamp-1">
                            With {app.assignedOfficerName || 'Officer'}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 mt-0.5">
                            Queued
                          </span>
                        )}
                      </div>
                    );
                  })}

                  {/* Step N+1: Final Order / Certificate Issuance */}
                  <div className="flex flex-col items-center relative z-10 w-36 text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${
                      isCompleted
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                        : 'bg-white border-2 border-slate-300 text-slate-400'
                    }`}>
                      {isCompleted ? <Check size={18} /> : <span>{totalJourneySteps}</span>}
                    </div>

                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full mt-2.5 border ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      Final Decree
                    </span>

                    <p className={`text-xs mt-1.5 font-bold leading-snug px-1 ${
                      isCompleted ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                      Order & Sanction
                    </p>

                    <p className="text-[11px] font-semibold mt-0.5">
                      {isCompleted ? (
                        <span className="text-emerald-700 font-bold">Order Issued</span>
                      ) : (
                        <span className="text-slate-400">Pending</span>
                      )}
                    </p>

                    <span className="text-[10px] text-slate-400 mt-0.5">
                      {isCompleted ? 'Records Updated' : 'Awaiting Clearances'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tahsildar Certified Land Ownership & Dispute Clearance Document (Statutory Proof) */}
              {/* STRICT RULE: ONLY for Land Grievance and Disputes service, ONLY when ALL departments have approved, and ONLY to the specific citizen who applied */}
              {(() => {
                const isGrievanceService = app.serviceType === 'grievance';
                const isAllDeptsApproved = (app.status === 'COMPLETED' || app.status === 'APPROVED') &&
                  stages.length > 0 &&
                  stages.every(s => s.status === 'APPROVED');
                const isAuthorizedApplicant = !user || user.role === 'admin' || user.role === 'officer' || user.id === app.citizenId || user.email === app.citizenEmail;

                if (!isGrievanceService || !isAllDeptsApproved || !isAuthorizedApplicant) {
                  return null;
                }

                return (
                  <div className="mt-6 p-5 rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white shadow-xl border border-emerald-500/40 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center flex-shrink-0 shadow-inner">
                          <Award size={26} className="text-emerald-300" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400/50 text-emerald-200 text-[10px] font-mono font-bold uppercase tracking-wider">
                              Official Statutory Title Proof
                            </span>
                            <span className="text-xs text-emerald-300/80 font-medium">
                              All Department Approvals Verified · Issued to Applicant
                            </span>
                          </div>
                          <h3 className="text-lg font-black text-white mt-1 tracking-tight">
                            Tahsildar Certified Land Ownership & Dispute Clearance Order
                          </h3>
                          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                            Statutory adjudication and title clearance certificate issued under state land governance laws following complete inter-departmental verification. Features survey boundaries, recorded extents, non-encumbrance validation, and Tahsildar Class-3 Digital Signature.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full md:w-auto">
                        <button
                          onClick={() => setShowCertModal(true)}
                          className="w-full md:w-auto px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                        >
                          <FileText size={16} className="text-slate-950" />
                          <span>View & Print Certified Ownership Proof</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Multi-Department Information Cards */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Current Department Desk
                    </span>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {isCompleted ? 'Final Authority (Completed)' : `${activeStage?.department || 'Revenue'} Department`}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isCompleted
                        ? 'All statutory departments have signed off'
                        : `Desk ${curStageIdx + 1} of ${totalStagesCount} in sequential clearance`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <User size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Assigned Verifying Official
                    </span>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {isCompleted ? 'Tahsildar & Executive Magistrate' : currentOfficer?.name || app.assignedOfficerName || 'Jurisdictional Officer'}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isCompleted ? 'Statutory decree issued' : activeStage?.officialTitle || 'Scrutinizing case file'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                    <ArrowRight size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Next Department in Pipeline
                    </span>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {isCompleted ? (
                        <span className="text-emerald-700 font-black">All Clear · Final Order Dispatched</span>
                      ) : curStageIdx + 1 < stages.length ? (
                        `${stages[curStageIdx + 1].department} Department`
                      ) : (
                        'Final Authority (Tahsildar Decree)'
                      )}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isCompleted
                        ? 'Citizen may download certified extract'
                        : 'Transfers automatically upon current sign-off'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Service SLA & Processing Meta */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">Case File Integrity</span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                      Single Permanent Token
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      All departments operate on the same case record without duplication.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">{t('track.expectedBy', 'Expected By')}</span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                      {formatDate(new Date(Date.now() + 86400000 * (activeStage?.slaDays || 7)).toISOString())}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                      {t('track.withinSla', 'Within statutory citizen charter SLA')}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">{t('track.totalProcessingTime', 'Total Processing Time')}</span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 font-mono">
                      {curStageIdx + 1} / {totalStagesCount} Desks
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {isCompleted ? 'Disposed & Finalized' : `${totalStagesCount - curStageIdx} stages remaining`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Blue SMS alert banner */}
              <div className="mt-5 p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center gap-2.5 font-medium">
                <Info size={18} className="text-blue-600 flex-shrink-0" />
                <span>{t('track.smsEmailAlert', 'You will be notified via SMS and Email whenever a department officer approves or requests corrections.')}</span>
              </div>
            </div>

            {/* Detailed Department Clearance Timeline Log */}
            <div className="gov-card p-6 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Statutory Department Clearance Log & Verification Desks
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official officers, documents reviewed, and permissions required for {app.serviceName}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                  {approvedStagesCount} of {stages.length} Cleared
                </span>
              </div>

              <div className="space-y-3 pt-1">
                {/* Step 0: Submission Card */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                      ✓
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-800">
                          Citizen e-Filing
                        </span>
                        <span className="text-xs font-extrabold text-slate-900">
                          Application Submission & Registration
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Application submitted by <span className="font-semibold">{app.citizenName}</span>. Land records & preliminary uploaded deeds received into central queue.
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                        Timestamp: {formatDate(app.submittedAt)}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs self-start md:self-center">
                    Completed
                  </span>
                </div>

                {/* Steps 1..N: Each Department Desk */}
                {stages.map((stage, idx) => {
                  const isStageApproved = stage.status === 'APPROVED' || isCompleted;
                  const isStageCurrent = curStageIdx === idx && !isCompleted;
                  const isCorrection = stage.status === 'CORRECTION_REQUIRED';
                  const isRejected = stage.status === 'REJECTED';
                  const deptColors = getDeptColor(stage.department);

                  return (
                    <div
                      key={stage.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-start justify-between gap-4 ${
                        isStageApproved
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : isStageCurrent
                          ? `${deptColors.bg} border-blue-300 ring-2 ring-blue-400/20 shadow-xs`
                          : isCorrection
                          ? 'bg-amber-50 border-amber-300'
                          : 'bg-white border-slate-200/80 opacity-80'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5 ${
                            isStageApproved
                              ? 'bg-emerald-600 text-white'
                              : isStageCurrent
                              ? 'bg-blue-600 text-white animate-pulse'
                              : isCorrection
                              ? 'bg-amber-600 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isStageApproved ? '✓' : idx + 1}
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${deptColors.badge}`}>
                              {stage.department} Department
                            </span>
                            <span className="text-xs font-black text-slate-900">
                              {stage.roleName}
                            </span>
                            {stage.officialTitle && (
                              <span className="text-[11px] text-slate-500 font-medium">
                                ({stage.officialTitle})
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-700 leading-relaxed">
                            {stage.description || 'Statutory review of title, ground measurements, and legal compliance.'}
                          </p>

                          {/* Documents verified pills */}
                          {stage.documentsVerified && stage.documentsVerified.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap pt-1">
                              <span className="text-[10px] font-bold uppercase text-slate-400">Verifying:</span>
                              {stage.documentsVerified.map((doc, dIdx) => (
                                <span
                                  key={dIdx}
                                  className="text-[10px] font-semibold bg-white/90 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200/90 shadow-2xs"
                                >
                                  {doc}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Completed officer remarks */}
                          {stage.actionByName && (
                            <div className="mt-2 p-2.5 rounded-xl bg-emerald-100/70 border border-emerald-200 text-xs text-emerald-950">
                              <p className="font-bold flex items-center gap-1.5">
                                <CheckCircle2 size={13} className="text-emerald-700" />
                                <span>Approved by {stage.actionByName} on {stage.actionDate ? formatDate(stage.actionDate) : 'Official Date'}</span>
                              </p>
                              {stage.remarks && (
                                <p className="text-[11px] text-emerald-900 mt-1 italic">
                                  "{stage.remarks}"
                                </p>
                              )}
                            </div>
                          )}

                          {isStageCurrent && (
                            <p className="text-[11px] font-bold text-blue-700 pt-1 flex items-center gap-1">
                              <Clock size={12} />
                              <span>Under active statutory verification · Expected clearance within {stage.slaDays} days</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right-aligned status pill */}
                      <div className="self-start md:self-center flex-shrink-0">
                        {isStageApproved ? (
                          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-200">
                            Clearance Granted
                          </span>
                        ) : isStageCurrent ? (
                          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 font-bold text-xs border border-blue-200 animate-pulse">
                            Under Review
                          </span>
                        ) : isCorrection ? (
                          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200">
                            Action Required
                          </span>
                        ) : isRejected ? (
                          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-900 font-bold text-xs border border-rose-200">
                            Rejected
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 font-bold text-xs border border-slate-200">
                            Awaiting Queue
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Land & Jurisdiction Details Summary */}
            <div className="gov-card p-6 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
                {t('track.landJurisdictionMapping', 'Land Parcel & Jurisdiction Mapping')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px]">{t('track.surveyNumber', 'Survey Number')}</span>
                  <p className="font-extrabold text-slate-900 mt-0.5 text-sm">{app.surveyNumber}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px]">{t('track.village', 'Village')}</span>
                  <p className="font-extrabold text-slate-900 mt-0.5 text-sm">{app.village}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px]">{t('track.mandalTaluk', 'Mandal / Taluk')}</span>
                  <p className="font-extrabold text-slate-900 mt-0.5 text-sm">{app.mandalName}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px]">{t('track.districtState', 'District & State')}</span>
                  <p className="font-extrabold text-slate-900 mt-0.5 text-sm">{app.districtName}, {app.stateName}</p>
                </div>
              </div>
            </div>

            {/* Tahsildar Official Land Ownership Document Modal */}
            <TahsildarLandOwnershipCertificateModal
              application={app}
              isOpen={showCertModal}
              onClose={() => setShowCertModal(false)}
            />
          </div>
        )}
      </PageContent>
    </PageLayout>
  );
}
