import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { StatCard } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { formatDate } from '../../utils';
import {
  DEMO_OFFICERS, DEMO_MANDALS, DEMO_STATES, DEMO_REGISTERED_CITIZENS
} from '../../data/demoData';
import {
  Users, Building, ClipboardList, CheckSquare, Globe2,
  Network, ShieldCheck, ArrowRight, ChevronRight, Activity, BookOpen,
  BarChart3, TrendingUp, Award, PieChart
} from 'lucide-react';
import type { ApplicationStatus } from '../../types';
import { GovernanceInsightsPanel } from '../../components/governance/GovernanceInsightsPanel';

export function AdminDashboard() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { applications, auditLogs } = useAppStore();

  const totalCitizens = DEMO_REGISTERED_CITIZENS.length;
  const totalOfficers = DEMO_OFFICERS.length;
  const pendingApps = applications.filter(a => !['COMPLETED', 'REJECTED'].includes(a.status)).length;
  const completedApps = applications.filter(a => a.status === 'COMPLETED').length;

  return (
    <PageLayout role="admin">
      <DemoBanner />
      <PageHeader
        title={t('admin.dashboard')}
        subtitle={t('admin.commandCenter', 'National Digital Public Infrastructure Command & Control')}
        breadcrumb={[{ label: t('nav.home', 'Home'), path: '/' }, { label: t('nav.dashboard') }]}
        action={
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <ShieldCheck size={15} className="text-emerald-600" />
              {t('admin.all4StatesSync', 'All 4 State Nodes Synchronized')}
            </span>
          </div>
        }
      />

      <PageContent>
        {/* National DPI Control Center Strip */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-slate-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-bold mb-2.5 backdrop-blur-xs border border-white/10">
                <Globe2 size={14} className="text-indigo-400" />
                <span>{t('admin.interStateCadastralEngine', 'Inter-State Cadastral Federation Engine')}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {t('admin.commandCenterTitle', 'DharaniSetu National Command Center')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
                {t('admin.commandCenterDesc', 'Federated governance covering Andhra Pradesh, Telangana, Tamil Nadu, and Chandigarh. Unified land registration, automated cadastral AI discrepancy resolution, and multi-departmental APIs.')}
              </p>
            </div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <Link
                to="/admin/users"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-1.5"
              >
                <Users size={15} />
                <span>{t('admin.registeredCitizens', 'Registered Citizens')}</span>
              </Link>
              <Link
                to="/admin/officers"
                className="bg-white text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-1.5"
              >
                <Building size={15} />
                <span>{t('admin.manageOfficers', 'Manage Officers')}</span>
              </Link>
              <Link
                to="/admin/interoperability"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-1.5"
              >
                <Network size={15} />
                <span>Interoperability Hub</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 6 StatCards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard
            label={t('admin.verifiedCitizens', 'Verified Citizens')}
            value={totalCitizens}
            icon={<Users size={18} className="text-blue-700" />}
            color="bg-blue-50 text-blue-700"
          />
          <StatCard
            label={t('admin.activeTahsildars', 'Active Tahsildars')}
            value={totalOfficers}
            icon={<Building size={18} className="text-emerald-700" />}
            color="bg-emerald-50 text-emerald-700"
          />
          <StatCard
            label={t('officer.allApplications', 'Total Applications')}
            value={applications.length}
            icon={<ClipboardList size={18} className="text-purple-700" />}
            color="bg-purple-50 text-purple-700"
          />
          <StatCard
            label={t('admin.pendingScrutiny', 'Pending Scrutiny')}
            value={pendingApps}
            icon={<CheckSquare size={18} className="text-amber-700" />}
            color="bg-amber-50 text-amber-700"
          />
          <StatCard
            label={t('admin.ordersDisposed', 'Orders Disposed')}
            value={completedApps}
            icon={<CheckSquare size={18} className="text-teal-700" />}
            color="bg-teal-50 text-teal-700"
          />
          <StatCard
            label={t('admin.integratedStates', 'Integrated States')}
            value={DEMO_STATES.length}
            icon={<Globe2 size={18} className="text-sky-700" />}
            color="bg-sky-50 text-sky-700"
          />
        </div>

        {/* Interactive National Analytics & SLA Dashboard */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                <BarChart3 size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{t('admin.analyticsDashboard', 'National DPI Analytics Dashboard')}</h3>
                <p className="text-xs text-slate-500">{t('admin.analyticsSubtitle', 'Real-time throughput, multi-state distribution, and statutory SLA performance')}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
              <TrendingUp size={14} />
              98.4% On-Time Disposal
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-2">
            {/* Multi-Department Live Pipeline Queues */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">1. Revenue Desk</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-2xl font-black text-emerald-950">
                {applications.filter(a => a.currentDepartment === 'Revenue' && a.status !== 'COMPLETED').length}
              </p>
              <p className="text-[11px] text-emerald-800 font-medium">Title & encumbrance scrutiny in progress</p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">2. Survey Desk</span>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>
              <p className="text-2xl font-black text-blue-950">
                {applications.filter(a => a.currentDepartment === 'Survey' && a.status !== 'COMPLETED').length}
              </p>
              <p className="text-[11px] text-blue-800 font-medium">Cadastral & DGPS field checks active</p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800">3. Town Planning</span>
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              </div>
              <p className="text-2xl font-black text-purple-950">
                {applications.filter(a => a.currentDepartment === 'Town Planning' && a.status !== 'COMPLETED').length}
              </p>
              <p className="text-[11px] text-purple-800 font-medium">Layout, zoning & master plan clearance</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">4. Final Authority</span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              </div>
              <p className="text-2xl font-black text-amber-950">
                {applications.filter(a => a.currentDepartment === 'Final Authority' && a.status !== 'COMPLETED').length}
              </p>
              <p className="text-[11px] text-amber-800 font-medium">Tahsildar final order & passbook sanction</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* State Volume Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">State Cadastral Volume</h4>
                <PieChart size={14} className="text-slate-400" />
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { state: 'Andhra Pradesh', count: '14,290 Par.', pct: '42%', color: 'bg-emerald-600' },
                  { state: 'Telangana', count: '11,180 Par.', pct: '33%', color: 'bg-blue-600' },
                  { state: 'Tamil Nadu', count: '6,420 Par.', pct: '19%', color: 'bg-amber-600' },
                  { state: 'Chandigarh', count: '2,110 Par.', pct: '6%', color: 'bg-purple-600' },
                ].map(s => (
                  <div key={s.state} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                      <span>{s.state}</span>
                      <span>{s.count} ({s.pct})</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full ${s.color} rounded-full`} style={{ width: s.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Utilization Distribution */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Statutory Service Share</h4>
                <ClipboardList size={14} className="text-slate-400" />
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { name: 'Sale Deed Registration', share: '38%', bar: 'bg-indigo-600' },
                  { name: 'Succession Mutation', share: '24%', bar: 'bg-teal-600' },
                  { name: 'NALA Land Conversion', share: '18%', bar: 'bg-sky-600' },
                  { name: 'DGPS Boundary Survey', share: '12%', bar: 'bg-amber-600' },
                  { name: 'Encumbrance & ROR-1B', share: '8%', bar: 'bg-rose-600' },
                ].map(srv => (
                  <div key={srv.name} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                      <span>{srv.name}</span>
                      <span>{srv.share}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full ${srv.bar} rounded-full`} style={{ width: srv.share }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SLA & AI Discrepancy Resolution Metrics */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">SLA & AI Auto-Scrutiny</h4>
                <Award size={14} className="text-slate-400" />
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Avg Disposal Timeline</span>
                  <p className="text-lg font-black text-emerald-800">4.2 Business Days</p>
                  <p className="text-[10px] text-slate-500">Statutory mandate: &le; 15 days</p>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Cadastral AI Accuracy</span>
                  <p className="text-lg font-black text-indigo-800">99.2% Detection</p>
                  <p className="text-[10px] text-slate-500">Document Deed vs GIS shape reconciliations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rule-Based Governance Insights Panel (National Level DPI) */}
        <GovernanceInsightsPanel role="admin" />

        {/* Core Administrative Modules */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Core Governance Modules
              </h3>
              <p className="text-xs text-slate-500">
                Configure jurisdictional structures, official cadres, and citizen records
              </p>
            </div>
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
              Administrative Control
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {[
              { label: 'Registered Citizens', desc: 'Master directory, UIDAI e-KYC & passbooks', path: '/admin/users', icon: <Users size={20} className="text-blue-700" />, bg: 'bg-blue-50/50 border-blue-100 hover:border-blue-300' },
              { label: 'Tahsildar Postings', desc: 'Jurisdictional roster of 48 Revenue Officers', path: '/admin/officers', icon: <Building size={20} className="text-emerald-700" />, bg: 'bg-emerald-50/50 border-emerald-100 hover:border-emerald-300' },
              { label: 'Jurisdiction Hierarchy', desc: 'States, Districts, Mandals & Survey units', path: '/admin/jurisdictions', icon: <Globe2 size={20} className="text-amber-700" />, bg: 'bg-amber-50/50 border-amber-100 hover:border-amber-300' },
              { label: 'National GIS Cadastral', desc: 'Satellite boundaries & survey shape layers', path: '/admin/gis', icon: <Globe2 size={20} className="text-purple-700" />, bg: 'bg-purple-50/50 border-purple-100 hover:border-purple-300' },
              { label: 'Interoperability Hub', desc: 'Cross-departmental API nodes, GeoServer & telemetry', path: '/admin/interoperability', icon: <Network size={20} className="text-indigo-700" />, bg: 'bg-indigo-50/50 border-indigo-100 hover:border-indigo-300' },
            ].map(m => (
              <Link
                key={m.path}
                to={m.path}
                className={`p-5 rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-md bg-white flex flex-col justify-between ${m.bg}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-white shadow-xs border border-slate-100">
                    {m.icon}
                  </div>
                  <ArrowRight size={16} className="text-slate-400" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-900 block">{m.label}</span>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">{m.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Two-Column Section: System Applications & Audit Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Applications Registry */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                    <ClipboardList size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      System Applications Registry
                    </h3>
                    <p className="text-xs text-slate-500">Live feed across all administrative jurisdictions</p>
                  </div>
                </div>
                <Link
                  to="/admin/applications"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
                >
                  <span>View All ({applications.length})</span>
                  <ChevronRight size={14} />
                </Link>
              </div>

              {applications.length === 0 ? (
                <p className="text-sm text-slate-500 py-8 text-center">No applications logged yet.</p>
              ) : (
                <div className="space-y-3">
                  {applications.slice(0, 5).map(app => (
                    <div
                      key={app.id}
                      className="p-3.5 rounded-2xl border border-slate-200/70 bg-slate-50/40 hover:bg-white hover:border-emerald-300 transition-all flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-mono text-xs font-bold text-slate-900">{app.tokenNumber}</span>
                          <StatusBadge status={app.status as ApplicationStatus} />
                        </div>
                        <p className="text-xs font-semibold text-slate-800 truncate">
                          {app.serviceName}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {app.mandalName} · {app.districtName}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-bold text-slate-800 block">{app.citizenName}</span>
                        <span className="text-[11px] text-slate-400 mt-0.5 block">{formatDate(app.submittedAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Full statutory workflow management</span>
              <Link to="/admin/applications" className="font-bold text-emerald-700 hover:underline">
                Registry Manager →
              </Link>
            </div>
          </div>

          {/* Real-time System Audit Logs */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Statutory Audit Trail
                    </h3>
                    <p className="text-xs text-slate-500">Cryptographically verifiable event log</p>
                  </div>
                </div>
                <Link
                  to="/admin/audit"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
                >
                  <span>View All ({auditLogs.length})</span>
                  <ChevronRight size={14} />
                </Link>
              </div>

              <div className="space-y-3">
                {auditLogs.slice(0, 5).map(log => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-2xl border border-slate-200/70 bg-slate-50/40 text-xs hover:bg-white hover:border-indigo-300 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                        {log.action}
                      </span>
                      <span className="text-[11px] text-slate-400">{formatDate(log.timestamp)}</span>
                    </div>
                    <p className="text-xs font-medium text-slate-700 mt-1.5 truncate">{log.details}</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Officer / User: <strong className="text-slate-800">{log.userName}</strong> ({log.userRole})
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-600" />
                Immutable ledger recording active
              </span>
              <Link to="/admin/audit" className="font-bold text-emerald-700 hover:underline">
                Full Audit Trail →
              </Link>
            </div>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}
