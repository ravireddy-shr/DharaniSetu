import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { StatCard } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { formatDate } from '../../utils';
import {
  ClipboardList, CheckSquare, ThumbsUp, ThumbsDown,
  MapPin, Shield, Map, Network, ArrowRight, Building, ChevronRight
} from 'lucide-react';
import type { OfficerProfile } from '../../types';
import { GovernanceInsightsPanel } from '../../components/governance/GovernanceInsightsPanel';

export function OfficerDashboard() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const officer = user as OfficerProfile;
  const { getApplicationsForOfficer, getNotifications, syncWithSupabase } = useAppStore();

  useEffect(() => {
    syncWithSupabase();
  }, [syncWithSupabase]);
  const apps = officer ? getApplicationsForOfficer(officer.id) : [];
  const notifs = officer ? getNotifications(officer.id) : [];
  const unread = notifs.filter(n => !n.isRead).length;

  const pending = apps.filter(a => ['SUBMITTED','ROUTED','DOCUMENT_VERIFICATION','GIS_VERIFICATION','FIELD_VERIFICATION'].includes(a.status)).length;
  const review = apps.filter(a => a.status === 'OFFICER_REVIEW').length;
  const approved = apps.filter(a => ['APPROVED','RECORD_UPDATE','COMPLETED'].includes(a.status)).length;
  const rejected = apps.filter(a => a.status === 'REJECTED').length;

  return (
    <PageLayout role="officer">
      <DemoBanner />
      <PageHeader
        title={t('officer.dashboard')}
        subtitle={officer ? `${officer.designation} — ${officer.jurisdictionMandal?.split('-').pop()}, ${officer.jurisdictionDistrict?.split('-').pop()}` : 'Revenue Administration Portal'}
        breadcrumb={[{ label: 'Home', path: '/' }, { label: t('officer.dashboard') }]}
        action={
          <div className="flex items-center gap-2">
            <Link
              to="/officer/pending"
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all"
            >
              <CheckSquare size={15} />
              <span>Pending Reviews ({pending})</span>
            </Link>
          </div>
        }
      />

      <PageContent>
        {/* Officer / Tahsildar Executive Profile Strip */}
        {officer && (
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-slate-800 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center font-black text-xl flex-shrink-0 shadow-md border border-white/20">
                  {officer.name?.[0] || 'O'}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      {officer.department || 'Revenue'} Department
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                      {officer.designation}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      ID: {officer.officerId}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {officer.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    {officer.designation} · {officer.department} Department
                  </p>
                </div>
              </div>

              {/* Jurisdiction Cards */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('common.state', 'State')}</p>
                  <p className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">{officer.jurisdictionState}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('common.district', 'District')}</p>
                  <p className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">{officer.jurisdictionDistrict?.split('-').pop()}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('common.mandal', 'Mandal')}</p>
                  <p className="text-xs sm:text-sm font-bold text-emerald-300 mt-0.5 truncate">{officer.jurisdictionMandal?.split('-').pop()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Statutory Actions Dock */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: t('officer.pendingVerification', 'Pending Verification'), desc: `${pending} ${t('officer.filesRequiringScrutiny', 'files requiring scrutiny')}`, path: '/officer/pending', icon: <CheckSquare size={20} className="text-amber-700" />, bg: 'bg-amber-50/80 border-amber-200/80' },
            { label: t('officer.cadastralGisExplorer', 'Cadastral GIS Explorer'), desc: t('officer.inspectBoundaryOverlay', 'Inspect boundary & overlay parcels'), path: '/officer/gis', icon: <Map size={20} className="text-sky-700" />, bg: 'bg-sky-50/80 border-sky-200/80' },
            { label: t('officer.statutoryApprovals', 'Statutory Approvals'), desc: t('officer.digitalSignaturesFinalOrder', 'Digital signatures & final order'), path: '/officer/approvals', icon: <Shield size={20} className="text-emerald-700" />, bg: 'bg-emerald-50/80 border-emerald-200/80' },
            { label: t('nav.interoperability', 'Interoperability Hub'), desc: t('officer.syncRorDeeds', 'Sync RoR & Registration deeds'), path: '/officer/interoperability', icon: <Network size={20} className="text-purple-700" />, bg: 'bg-purple-50/80 border-purple-200/80' },
          ].map(action => (
            <Link
              key={action.path}
              to={action.path}
              className={`p-4 rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-md bg-white flex flex-col justify-between ${action.bg}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-white shadow-xs border border-slate-100">
                  {action.icon}
                </div>
                <ArrowRight size={16} className="text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{action.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/officer/applications" className="block transition-transform hover:scale-[1.02]">
            <StatCard
              label={t('officer.totalApplications', 'Total Applications')}
              value={apps.length}
              icon={<ClipboardList size={22} className="text-sky-700" />}
              color="bg-sky-100/80"
              sub={t('officer.assignedJurisdiction', 'Assigned Jurisdiction')}
            />
          </Link>
          <Link to="/officer/applications?tab=pending" className="block transition-transform hover:scale-[1.02]">
            <StatCard
              label={t('officer.pendingVerification')}
              value={pending}
              icon={<CheckSquare size={22} className="text-amber-700" />}
              color="bg-amber-100/80"
              sub={review > 0 ? `${review} ${t('officer.awaitingSignOff', 'awaiting sign-off')}` : t('officer.inQueue', 'In Queue')}
            />
          </Link>
          <Link to="/officer/applications?tab=completed" className="block transition-transform hover:scale-[1.02]">
            <StatCard
              label={t('officer.approved')}
              value={approved}
              icon={<ThumbsUp size={22} className="text-emerald-700" />}
              color="bg-emerald-100/80"
              sub={t('officer.digitallyEndorsed', 'Digitally Endorsed')}
            />
          </Link>
          <Link to="/officer/applications?tab=rejected" className="block transition-transform hover:scale-[1.02]">
            <StatCard
              label={t('officer.rejected')}
              value={rejected}
              icon={<ThumbsDown size={22} className="text-rose-700" />}
              color="bg-rose-100/80"
              sub={unread > 0 ? `${unread} ${t('officer.statutoryAlerts', 'statutory alerts')}` : t('officer.disposed', 'Disposed')}
            />
          </Link>
        </div>

        {/* Rule-Based Governance Insights Panel (Prototype) */}
        <GovernanceInsightsPanel
          role="officer"
          officerMandal={officer?.jurisdictionMandal}
          officerDistrict={officer?.jurisdictionDistrict}
          officerState={officer?.jurisdictionState}
        />

        {/* Applications List */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {t('officer.statutoryRoster', 'Statutory Applications Roster')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('officer.queuedSubtitle', 'Land governance requests queued for officer verification & decision')}
              </p>
            </div>
            <Link
              to="/officer/applications"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
            >
              <span>{t('common.viewAll')}</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {apps.length === 0 ? (
            <div className="text-center py-10">
              <ClipboardList size={40} className="text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">{t('dashboard.allUpToDate', 'All Files Up to Date')}</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {t('officer.noAppsInQueue', 'No applications found in this queue')}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {apps.slice(0, 6).map(app => (
                <Link
                  key={app.id}
                  to={`/officer/applications/${app.id}`}
                  className="p-4 rounded-2xl border border-slate-200/70 bg-slate-50/40 hover:bg-white hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 block group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 font-bold">
                      <MapPin size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-mono text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {app.tokenNumber}
                        </span>
                        <StatusBadge status={app.status} />
                      </div>
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {app.serviceName} · <span className="font-normal text-slate-600">{t('application.applicantInfo', 'Applicant')}: {app.citizenName}</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {t('common.surveyNumber', 'Survey')} #{app.surveyNumber} · {t('application.submitted', 'Submitted')} {formatDate(app.submittedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <span className="text-xs font-bold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1">
                      <span>{t('officer.reviewFile', 'Review File')}</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </PageContent>
    </PageLayout>
  );
}
