import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { TahsildarLandOwnershipCertificateModal } from '../../components/documents/TahsildarLandOwnershipCertificateModal';
import { DocumentInspectionModal } from '../../components/documents/DocumentInspectionModal';
import { formatDate } from '../../utils';
import {
  FileText, MapPin, CheckCircle2, Clock, Map, User,
  Building, ArrowLeft, Download, ShieldCheck, Award, Eye,
  AlertCircle, ArrowRight
} from 'lucide-react';
import type { ApplicationStatus, Document } from '../../types';

export function ApplicationDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getApplicationById, getStatusHistory, getDocuments } = useAppStore();
  const [showCertModal, setShowCertModal] = useState(false);
  const [inspectingDoc, setInspectingDoc] = useState<Document | null>(null);

  const application = id ? getApplicationById(id) : undefined;
  const history = id ? getStatusHistory(id) : [];
  const documents = id ? getDocuments(id) : [];

  if (!application) {
    return (
      <PageLayout role="citizen">
        <DemoBanner />
        <PageContent>
          <div className="gov-card text-center py-12">
            <p className="text-sm font-semibold text-brand-navy">{t('appDetail.notFound', 'Application Not Found')}</p>
            <p className="text-xs text-brand-muted mt-1">{t('appDetail.notFoundDesc', 'The requested application ID does not exist.')}</p>
            <button
              onClick={() => navigate('/citizen/applications')}
              className="gov-btn-primary text-xs mt-4"
            >
              {t('appDetail.backToApps', 'Back to Applications')}
            </button>
          </div>
        </PageContent>
      </PageLayout>
    );
  }

  return (
    <PageLayout role="citizen">
      <DemoBanner />
      <PageHeader
        title={`${t('common.application', 'Application')} ${application.tokenNumber}`}
        subtitle={`${application.serviceName} · ${t('common.submittedOn', 'Submitted on')} ${formatDate(application.submittedAt)}`}
        breadcrumb={[
          { label: t('nav.home', 'Home') },
          { label: t('nav.myApplications'), path: '/citizen/applications' },
          { label: application.tokenNumber },
        ]}
        action={
          <div className="flex items-center gap-2">
            <Link
              to={`/citizen/track?token=${application.tokenNumber}`}
              className="px-3 py-1.5 rounded border border-brand-navy text-xs text-brand-navy hover:bg-brand-light font-medium"
            >
              {t('appDetail.trackRealTime', 'Track Real-Time')}
            </Link>
            <Link
              to="/citizen/applications"
              className="gov-btn-secondary flex items-center gap-1 text-xs"
            >
              <ArrowLeft size={14} />
              <span>{t('appDetail.back', 'Back')}</span>
            </Link>
          </div>
        }
      />

      <PageContent>
        {/* Top Summary Banner */}
        <div className="gov-card bg-brand-navy text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-saffron">{t('appDetail.tokenNumber', 'Token Number')}</span>
              <StatusBadge status={application.status as ApplicationStatus} />
            </div>
            <h2 className="text-xl font-mono font-bold mt-1">{application.tokenNumber}</h2>
            <p className="text-xs text-white/80 mt-1">
              {t('appDetail.service', 'Service')}: <strong className="text-white">{application.serviceName}</strong>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs border-t md:border-t-0 md:border-l border-white/20 pt-3 md:pt-0 md:pl-6">
            <div>
              <p className="text-white/60 uppercase text-[10px]">{t('appDetail.landJurisdiction', 'Land Jurisdiction')}</p>
              <p className="font-semibold text-white mt-0.5">{application.mandalName}</p>
              <p className="text-white/70 text-[11px]">{application.districtName}</p>
            </div>
            <div>
              <p className="text-white/60 uppercase text-[10px]">{t('appDetail.surveyNumber', 'Survey Number')}</p>
              <p className="font-semibold text-white mt-0.5">{application.surveyNumber}</p>
              <p className="text-white/70 text-[11px]">{application.village}</p>
            </div>
            <div>
              <p className="text-white/60 uppercase text-[10px]">Current Department Desk</p>
              <p className="font-semibold text-white mt-0.5">{application.currentDepartment || 'Revenue'}</p>
              <p className="text-white/70 text-[11px]">Desk Stage {(application.currentStageIndex ?? 0) + 1}</p>
            </div>
            <div>
              <p className="text-white/60 uppercase text-[10px]">{t('appDetail.assignedOfficer', 'Assigned Officer')}</p>
              <p className="font-semibold text-white mt-0.5">{application.assignedOfficerName || t('appDetail.jurisdictionQueue', 'Jurisdiction Queue')}</p>
              <p className="text-white/70 text-[11px]">{application.currentDepartment || 'Revenue'} Dept</p>
            </div>
          </div>
        </div>

        {/* Tahsildar Certified Land Ownership & Dispute Clearance Document (Statutory Proof) */}
        {/* STRICT CONDITION: ONLY for Land Grievance and Disputes service, ONLY when all departments in workflow approved, and ONLY to the specific applicant citizen */}
        {(() => {
          const isGrievanceService = application.serviceType === 'grievance';
          const stages = application.workflowStages || [];
          const isAllDeptsApproved = (application.status === 'COMPLETED' || application.status === 'APPROVED') &&
            stages.length > 0 &&
            stages.every(s => s.status === 'APPROVED');
          const isAuthorizedApplicant = !user || user.role === 'admin' || user.role === 'officer' || user.id === application.citizenId || user.email === application.citizenEmail;

          if (!isGrievanceService || !isAllDeptsApproved || !isAuthorizedApplicant) {
            return null;
          }

          return (
            <div className="gov-card p-5 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white border border-emerald-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center flex-shrink-0">
                  <Award size={26} className="text-emerald-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[10px] font-mono font-bold uppercase">
                      Statutory Proof Available
                    </span>
                    <span className="text-xs text-emerald-300/80">
                      All Department Clearances Verified · Issued to Applicant
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    Tahsildar Certified Land Ownership & Dispute Clearance Order
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Official statutory certificate confirming land ownership details, boundary schedule, non-encumbrance status, and magisterial dispute resolution.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowCertModal(true)}
                className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
              >
                <FileText size={15} className="text-slate-950" />
                <span>View & Print Official Order</span>
              </button>
            </div>
          );
        })()}

        {/* Rejection Notice Banner */}
        {application.status === 'REJECTED' && (
          <div className="gov-card p-5 bg-rose-50 border border-rose-300 shadow-sm flex flex-col md:flex-row items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <AlertCircle size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-200 text-rose-900 text-[10px] font-mono font-bold uppercase">
                    {t('status.REJECTED', 'Application Rejected')}
                  </span>
                  <span className="text-xs text-rose-800">
                    {t('appDetail.disposedNotice', 'Disposed following statutory departmental examination')}
                  </span>
                </div>
                <h3 className="text-base font-bold text-rose-950 mt-1">
                  {t('appDetail.rejectionNoticeTitle', 'Statutory Rejection Directive Issued')}
                </h3>
                {application.remarks && (
                  <div className="mt-2 p-3 bg-white rounded-xl border border-rose-200 text-xs text-slate-800">
                    <span className="font-bold text-rose-800 uppercase tracking-wider text-[10px] block mb-0.5">
                      {t('appDetail.recordedGrounds', 'Stated Grounds of Rejection')}:
                    </span>
                    <p className="italic font-medium">"{application.remarks}"</p>
                  </div>
                )}
                <p className="text-xs text-rose-800 mt-2">
                  {t('appDetail.appealInfo', 'You may cure the defects and submit a fresh application or file a statutory appeal with the Revenue Divisional Officer (RDO).')}
                </p>
              </div>
            </div>
            <Link
              to="/citizen/apply"
              className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all whitespace-nowrap self-start sm:self-auto"
            >
              <span>{t('track.submitFresh', 'Submit Fresh Request')}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Multi-Department Sequential Approval Pipeline Strip */}
        {application.workflowStages && application.workflowStages.length > 0 && (
          <div className="gov-card p-5 border border-slate-200">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Multi-Department Sequential Workflow Progress
              </h3>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Single Case File ID: {application.tokenNumber}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              {application.workflowStages.map((stg, i) => {
                const isStageRejected = stg.status === 'REJECTED' || (application.status === 'REJECTED' && (application.currentStageIndex ?? 0) === i);
                const isApproved = (stg.status === 'APPROVED' || application.status === 'COMPLETED') && !isStageRejected;
                const isCurrent = (application.currentStageIndex ?? 0) === i && application.status !== 'COMPLETED' && !isStageRejected;
                const isCorrection = stg.status === 'CORRECTION_REQUIRED';

                return (
                  <div
                    key={stg.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isStageRejected
                        ? 'bg-rose-50 border-rose-300'
                        : isApproved
                        ? 'bg-emerald-50/70 border-emerald-200'
                        : isCurrent
                        ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-400/20'
                        : isCorrection
                        ? 'bg-amber-50/80 border-amber-300'
                        : 'bg-slate-50 border-slate-200/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Step {i + 1}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        isStageRejected
                          ? 'bg-rose-200 text-rose-900'
                          : isApproved
                          ? 'bg-emerald-200 text-emerald-900'
                          : isCurrent
                          ? 'bg-blue-200 text-blue-900 animate-pulse'
                          : isCorrection
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {isStageRejected ? 'Rejected' : isApproved ? 'Approved' : isCurrent ? 'In Review' : isCorrection ? 'Correction' : 'Pending'}
                      </span>
                    </div>

                    <p className="text-xs font-black text-slate-900 mt-1">
                      {stg.department}
                    </p>
                    <p className="text-[11px] text-slate-600 font-medium leading-tight mt-0.5">
                      {stg.roleName}
                    </p>

                    {stg.actionByName && (
                      <p className={`text-[10px] font-semibold mt-2 pt-1 border-t ${isStageRejected ? 'text-rose-800 border-rose-200/60' : 'text-emerald-800 border-emerald-200/60'}`}>
                        {isStageRejected ? 'Rejected by: ' : 'Signed: '}{stg.actionByName}
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
          {/* Main Column: Details & Documents */}
          <div className="lg:col-span-2 space-y-4">
            {/* Land Parcel Info */}
            <div className="gov-card">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gov-border">
                <div className="flex items-center gap-2 text-brand-navy font-semibold text-sm">
                  <MapPin size={16} className="text-brand-green" />
                  <span>{t('appDetail.landParcelDetails', 'Land Parcel Details')}</span>
                </div>
                <Link
                  to={`/citizen/gis?parcel=${application.parcelId}`}
                  className="gov-btn-primary flex items-center gap-1.5 text-xs py-1"
                >
                  <Map size={14} />
                  <span>{t('appDetail.viewOnGis', 'View on GIS Map')}</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-brand-muted uppercase text-[10px]">{t('appDetail.surveyNumber', 'Survey Number')}</span>
                  <p className="font-medium text-gray-800">{application.surveyNumber}</p>
                </div>
                <div>
                  <span className="text-brand-muted uppercase text-[10px]">{t('appDetail.village', 'Village')}</span>
                  <p className="font-medium text-gray-800">{application.village}</p>
                </div>
                <div>
                  <span className="text-brand-muted uppercase text-[10px]">{t('appDetail.mandal', 'Mandal')}</span>
                  <p className="font-medium text-gray-800">{application.mandalName}</p>
                </div>
                <div>
                  <span className="text-brand-muted uppercase text-[10px]">{t('appDetail.district', 'District')}</span>
                  <p className="font-medium text-gray-800">{application.districtName}</p>
                </div>
                <div>
                  <span className="text-brand-muted uppercase text-[10px]">{t('appDetail.state', 'State')}</span>
                  <p className="font-medium text-gray-800">{application.stateName}</p>
                </div>
                <div>
                  <span className="text-brand-muted uppercase text-[10px]">{t('appDetail.parcelId', 'Parcel ID')}</span>
                  <p className="font-mono text-gray-800">{application.parcelId}</p>
                </div>
              </div>

              {application.formData && Object.keys(application.formData).length > 0 && (
                <div className="mt-4 pt-3 border-t border-gov-border">
                  <span className="text-brand-muted uppercase text-[10px] block mb-1">{t('appDetail.appPurposeNotes', 'Application Purpose / Notes')}</span>
                  <p className="text-xs bg-gray-50 p-2.5 rounded border border-gray-100 text-gray-700">
                    {application.formData.purpose || t('appDetail.standardSubmission', 'Standard service request submission.')}
                  </p>
                </div>
              )}
            </div>

            {/* Submitted Documents */}
            <div className="gov-card">
              <div className="flex items-center gap-2 text-brand-navy font-semibold text-sm mb-3 pb-2 border-b border-gov-border">
                <FileText size={16} className="text-blue-600" />
                <span>{t('appDetail.supportingDocs', 'Supporting Documents')} ({documents.length})</span>
              </div>

              {documents.length === 0 ? (
                <p className="text-xs text-brand-muted py-3">{t('appDetail.noDocsAttached', 'No documents attached.')}</p>
              ) : (
                <div className="space-y-2">
                  {documents.map(doc => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-2.5 rounded border border-gov-border bg-gray-50/60"
                    >
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-brand-navy" />
                        <div>
                          <p className="text-xs font-medium text-brand-navy">{doc.name}</p>
                          <p className="text-[11px] text-brand-muted">
                            {doc.fileName} · {(doc.fileSize / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase ${
                            doc.status === 'verified'
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : doc.status === 'rejected'
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          }`}
                        >
                          {t(`status.${doc.status}`, doc.status.toUpperCase())}
                        </span>
                        <button
                          onClick={() => setInspectingDoc(doc)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          title="View and inspect document"
                        >
                          <Eye size={12} />
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Applicant Information */}
            <div className="gov-card">
              <div className="flex items-center gap-2 text-brand-navy font-semibold text-sm mb-3 pb-2 border-b border-gov-border">
                <User size={16} className="text-teal-600" />
                <span>{t('appDetail.applicantInfo', 'Applicant Information')}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-brand-muted uppercase text-[10px]">{t('appDetail.applicantName', 'Applicant Name')}</span>
                  <p className="font-medium text-gray-800">{application.citizenName}</p>
                </div>
                <div>
                  <span className="text-brand-muted uppercase text-[10px]">{t('appDetail.email', 'Email')}</span>
                  <p className="font-medium text-gray-800">{application.citizenEmail}</p>
                </div>
                <div>
                  <span className="text-brand-muted uppercase text-[10px]">{t('appDetail.citizenId', 'Citizen ID')}</span>
                  <p className="font-mono text-gray-800">{application.citizenId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Real-Time Lifecycle Timeline */}
          <div className="space-y-4">
            <div className="gov-card">
              <div className="flex items-center gap-2 text-brand-navy font-semibold text-sm mb-3 pb-2 border-b border-gov-border">
                <Clock size={16} className="text-brand-orange" />
                <span>{t('appDetail.lifecycleTimeline', 'Lifecycle Timeline')}</span>
              </div>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                {history.map((h, idx) => (
                  <div key={h.id} className="relative">
                    <div
                      className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                        idx === history.length - 1
                          ? 'border-brand-green bg-green-50'
                          : 'border-brand-navy'
                      }`}
                    >
                      {idx === history.length - 1 ? (
                        <div className="w-2 h-2 rounded-full bg-brand-green" />
                      ) : (
                        <CheckCircle2 size={10} className="text-brand-navy" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-brand-navy">
                          {t(`status.${h.status}`, h.status.replace(/_/g, ' '))}
                        </p>
                      </div>
                      <p className="text-[10px] text-brand-muted">{formatDate(h.timestamp)}</p>
                      <p className="text-xs text-gray-600 mt-1 bg-gray-50 p-2 rounded border border-gray-100">
                        {h.remarks || t('appDetail.systemUpdate', 'Status updated by system.')}
                      </p>
                      <p className="text-[10px] text-brand-muted mt-0.5">{t('appDetail.statusUpdatedBy', 'By:')} {h.changedByName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Jurisdiction Guarantee Notice */}
            <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-200 text-xs text-blue-900 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold">
                <ShieldCheck size={14} className="text-blue-700" />
                <span>{t('appDetail.interopNoticeTitle', 'Interoperability Routing Notice')}</span>
              </div>
              <p className="text-[11px] leading-relaxed text-blue-800">
                {t('appDetail.interopNoticeDesc', 'In compliance with the national digital land framework, your application has been automatically routed to the authorized Mandal Officer strictly based on the land location.')}
              </p>
            </div>
          </div>
        </div>

        {/* Tahsildar Official Land Ownership Document Modal */}
        <TahsildarLandOwnershipCertificateModal
          application={application}
          isOpen={showCertModal}
          onClose={() => setShowCertModal(false)}
        />

        {/* Document Inspection Modal (Citizen Read-Only View) */}
        {inspectingDoc && (
          <DocumentInspectionModal
            document={inspectingDoc}
            application={application}
            isOpen={!!inspectingDoc}
            onClose={() => setInspectingDoc(null)}
            readOnly={true}
          />
        )}
      </PageContent>
    </PageLayout>
  );
}
