import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { StatCard } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { CITIZEN_PARCEL_IDS, DEMO_PARCELS, getParcelsForCitizen } from '../../data/demoData';
import { formatDate, cn } from '../../utils';
import {
  MapPin, FileText, Search, Bell, Send, Map,
  ChevronRight, ArrowUpRight, ShieldCheck, Sparkles
} from 'lucide-react';

export function CitizenDashboard() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { syncWithSupabase, getApplicationsForCitizen, getNotifications } = useAppStore();

  useEffect(() => {
    syncWithSupabase();
  }, [syncWithSupabase]);

  const apps = user ? getApplicationsForCitizen(user.id, user.email, user.name) : [];
  const notifs = user ? getNotifications(user.id) : [];
  const unread = notifs.filter(n => !n.isRead).length;
  const storeParcels = useAppStore(state => state.parcels);
  const parcels = user ? getParcelsForCitizen(user.state, user.name, user.email, storeParcels) : [];

  // Land categories & extents
  const farmingParcels = parcels.filter(p => (p.landUse || 'agricultural').toLowerCase() === 'agricultural');
  const commercialParcels = parcels.filter(p => (p.landUse || '').toLowerCase() === 'commercial');
  const buildingParcels = parcels.filter(p => ['residential', 'industrial', 'building', 'buildings'].includes((p.landUse || '').toLowerCase()));

  const totalFarmingAcres = farmingParcels.reduce((sum, p) => sum + (Number(p.area) || 0), 0);
  const totalCommercialSqft = commercialParcels.reduce((sum, p) => sum + (Number(p.areaSqft) || Math.round(Number(p.area) * 43560)), 0);
  const totalCommercialAcres = commercialParcels.reduce((sum, p) => sum + (Number(p.area) || 0), 0);
  const totalBuildingSqft = buildingParcels.reduce((sum, p) => sum + (Number(p.areaSqft) || Math.round(Number(p.area) * 43560)), 0);
  const totalBuildingAcres = buildingParcels.reduce((sum, p) => sum + (Number(p.area) || 0), 0);
  const totalAllAcres = parcels.reduce((sum, p) => sum + (Number(p.area) || 0), 0);
  const totalAllSqft = parcels.reduce((sum, p) => sum + (Number(p.areaSqft) || Math.round(Number(p.area) * 43560)), 0);

  const active = apps.filter(a => !['COMPLETED', 'REJECTED'].includes(a.status)).length;
  const pending = apps.filter(a => ['SUBMITTED', 'ROUTED', 'DOCUMENT_VERIFICATION', 'GIS_VERIFICATION', 'FIELD_VERIFICATION', 'OFFICER_REVIEW'].includes(a.status)).length;
  const completed = apps.filter(a => a.status === 'COMPLETED').length;

  return (
    <PageLayout role="citizen">
      <DemoBanner />
      <PageHeader
        title={`${t('dashboard.welcome')}, ${user?.name?.split(' ')[0] || 'Citizen'}`}
        subtitle="DharaniSetu — Citizen Land Governance & Statutory Services Portal"
        breadcrumb={[{ label: t('nav.home', 'Home'), path: '/' }, { label: t('nav.dashboard') }]}
        action={
          <div className="flex items-center gap-2">
            <Link
              to="/citizen/apply"
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all"
            >
              <Send size={15} />
              <span>{t('nav.applyService', 'Apply Service')}</span>
            </Link>
          </div>
        }
      />

      <PageContent>
        {/* Personalized Welcome Banner */}
        <div className="bg-gradient-to-r from-[#1D0A69] via-[#160854] to-[#115E59] text-white rounded-3xl p-6 sm:p-7 shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 backdrop-blur-3xl -skew-x-12 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold mb-2.5 backdrop-blur-xs">
                <ShieldCheck size={14} className="text-[#D97706]" />
                <span>{t('dashboard.verifiedIdentity', 'Verified Landholder · Digital Identity Active')}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Namaste, {user?.name || 'Citizen'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mt-1 leading-relaxed">
                {t('dashboard.welcomeCitizenMsg', 'Access your digitized land records, cadastral survey boundaries, mutation requests, and statutory certificates directly online.')}
              </p>
            </div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <Link
                to="/citizen/my-land"
                className="bg-white text-[#115E59] hover:bg-slate-50 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-1.5"
              >
                <MapPin size={15} />
                <span>{t('dashboard.myLandRecords', 'My Land Records')}</span>
              </Link>
              <Link
                to="/citizen/track"
                className="bg-white/15 hover:bg-white/25 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold backdrop-blur-xs border border-white/20 transition-all flex items-center gap-1.5"
              >
                <Search size={15} />
                <span>{t('dashboard.trackToken', 'Track Token')}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label={t('dashboard.totalLandHolding', 'Total Land Holding')}
            value={`${totalAllAcres.toFixed(2)} Acres`}
            icon={<MapPin size={22} className="text-emerald-700" />}
            color="bg-emerald-100/80"
            sub={`${parcels.length} ${parcels.length === 1 ? 'Registered Parcel' : 'Registered Parcels'}`}
          />
          <StatCard
            label={t('dashboard.activeApplications')}
            value={active}
            icon={<FileText size={22} className="text-sky-700" />}
            color="bg-sky-100/80"
            sub={t('dashboard.inPipeline', 'In Statutory Pipeline')}
          />
          <StatCard
            label={t('dashboard.pendingApplications')}
            value={pending}
            icon={<Search size={22} className="text-amber-700" />}
            color="bg-amber-100/80"
            sub={t('dashboard.underVerification', 'Under Verification')}
          />
          <StatCard
            label={t('dashboard.completedApplications')}
            value={completed}
            icon={<Bell size={22} className="text-purple-700" />}
            color="bg-purple-100/80"
            sub={unread > 0 ? `${unread} updates` : t('dashboard.allUpToDate', 'All Services Up-to-Date')}
          />
        </div>

        {/* Land Portfolio Extent by Category (Farming in Acres, Commercial in sq.ft, Buildings in sq.ft) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>{t('dashboard.portfolioByCategory', 'Land Portfolio Extent by Category')}</span>
                <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  {t('common.total', 'Total')}: {totalAllAcres.toFixed(2)} {t('common.acres', 'Acres')} ({totalAllSqft.toLocaleString('en-IN')} {t('common.sqft', 'sq.ft')})
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                {t('dashboard.portfolioSub', 'Statutory land division (Farming lands in Acres · Commercial & Buildings in sq.ft)')}
              </p>
            </div>
            <Link
              to="/citizen/my-land"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>{t('dashboard.viewAllRecords', 'View All Records')}</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Farming Land Card */}
            <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  🌾 {t('dashboard.farmingLand', 'Farming Land')}
                </span>
                <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                  {t('dashboard.agricultural', 'Agricultural')}
                </span>
              </div>
              <div className="my-1">
                <div className="text-2xl sm:text-3xl font-black text-emerald-950">
                  {totalFarmingAcres.toFixed(2)} <span className="text-base font-bold text-emerald-700">{t('common.acres', 'Acres')}</span>
                </div>
                <p className="text-xs text-emerald-800/80 font-medium mt-0.5">
                  {(totalFarmingAcres * 43560).toLocaleString('en-IN')} {t('dashboard.sqftExtent', 'sq.ft extent')}
                </p>
              </div>
              <div className="pt-2 border-t border-emerald-200/60 mt-2 flex items-center justify-between text-xs text-emerald-900">
                <span>{t('dashboard.registeredParcels', 'Registered Parcels')}:</span>
                <strong className="font-bold">{farmingParcels.length}</strong>
              </div>
            </div>

            {/* Commercial Land Card */}
            <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  🏢 {t('dashboard.commercialLand', 'Commercial Land')}
                </span>
                <span className="text-[10px] font-bold bg-amber-600 text-white px-2 py-0.5 rounded-full">
                  {t('dashboard.commercial', 'Commercial')}
                </span>
              </div>
              <div className="my-1">
                <div className="text-2xl sm:text-3xl font-black text-amber-950">
                  {totalCommercialSqft > 0 ? (
                    <>
                      {totalCommercialSqft.toLocaleString('en-IN')} <span className="text-base font-bold text-amber-700">{t('common.sqft', 'sq.ft')}</span>
                    </>
                  ) : (
                    <>
                      0 <span className="text-base font-bold text-slate-400">{t('common.sqft', 'sq.ft')}</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-amber-800/80 font-medium mt-0.5">
                  {totalCommercialAcres > 0 ? `${totalCommercialAcres.toFixed(2)} ${t('dashboard.acresRegistered', 'Acres registered')}` : t('dashboard.noCommercialParcels', 'No commercial parcels')}
                </p>
              </div>
              <div className="pt-2 border-t border-amber-200/60 mt-2 flex items-center justify-between text-xs text-amber-900">
                <span>{t('dashboard.registeredParcels', 'Registered Parcels')}:</span>
                <strong className="font-bold">{commercialParcels.length}</strong>
              </div>
            </div>

            {/* Buildings & Residential Card */}
            <div className="p-4 rounded-2xl border border-sky-200 bg-sky-50/50 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-900">
                  🏠 {t('dashboard.buildingsResidential', 'Buildings & Residential')}
                </span>
                <span className="text-[10px] font-bold bg-sky-600 text-white px-2 py-0.5 rounded-full">
                  {t('dashboard.nonAgriBuilt', 'Non-Agri / Built')}
                </span>
              </div>
              <div className="my-1">
                <div className="text-2xl sm:text-3xl font-black text-sky-950">
                  {totalBuildingSqft > 0 ? (
                    <>
                      {totalBuildingSqft.toLocaleString('en-IN')} <span className="text-base font-bold text-sky-700">{t('common.sqft', 'sq.ft')}</span>
                    </>
                  ) : (
                    <>
                      0 <span className="text-base font-bold text-slate-400">{t('common.sqft', 'sq.ft')}</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-sky-800/80 font-medium mt-0.5">
                  {totalBuildingAcres > 0 ? `${totalBuildingAcres.toFixed(2)} ${t('dashboard.acresRegistered', 'Acres registered')}` : t('dashboard.noBuiltParcels', 'No built parcels')}
                </p>
              </div>
              <div className="pt-2 border-t border-sky-200/60 mt-2 flex items-center justify-between text-xs text-sky-900">
                <span>{t('dashboard.registeredParcels', 'Registered Parcels')}:</span>
                <strong className="font-bold">{buildingParcels.length}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Dock matching Reference UI */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">{t('dashboard.quickActions')}</h3>
              <p className="text-xs text-slate-500">{t('dashboard.fastAccessMsg', 'Fast access to key public land services')}</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              5 {t('nav.services', 'Modules')}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { icon: <MapPin size={22} />, label: t('nav.myLand'), path: '/citizen/my-land', desc: 'Registered plots & passbooks', color: 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:border-emerald-300' },
              { icon: <Map size={22} />, label: t('nav.gis'), path: '/citizen/gis', desc: 'Satellite cadastral explorer', color: 'bg-sky-50 text-sky-700 border-sky-100 hover:border-sky-300' },
              { icon: <Send size={22} />, label: t('nav.applyService'), path: '/citizen/apply', desc: 'New mutation or survey request', color: 'bg-amber-50 text-amber-700 border-amber-100 hover:border-amber-300' },
              { icon: <Search size={22} />, label: t('nav.trackApplication'), path: '/citizen/track', desc: 'Live horizontal stage tracker', color: 'bg-purple-50 text-purple-700 border-purple-100 hover:border-purple-300' },
              { icon: <Bell size={22} />, label: t('nav.notifications'), path: '/citizen/notifications', desc: 'Statutory notices & alerts', color: 'bg-rose-50 text-rose-700 border-rose-100 hover:border-rose-300' },
            ].map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center text-center group hover:-translate-y-0.5 hover:shadow-md ${item.color} bg-white`}
              >
                <div className="p-3 rounded-2xl mb-2.5 group-hover:scale-110 transition-transform bg-slate-50 border border-slate-100">
                  {item.icon}
                </div>
                <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 leading-snug">
                  {item.label}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 leading-tight hidden sm:block">
                  {item.desc}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Two-column layout: My Land & Recent Applications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Land Records */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{t('land.myLandTitle')}</h3>
                    <p className="text-xs text-slate-500">{t('dashboard.verifiedLandholdingsRecord', 'Verified landholdings on record')}</p>
                  </div>
                </div>
                <Link
                  to="/citizen/my-land"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
                >
                  <span>{t('common.viewAll')}</span>
                  <ChevronRight size={14} />
                </Link>
              </div>

              <div className="space-y-3">
                {parcels.map(p => {
                  const isCommercial = (p.landUse || '').toLowerCase() === 'commercial';
                  const isBuilding = ['residential', 'industrial', 'building', 'buildings'].includes((p.landUse || '').toLowerCase());
                  const sqftVal = Number(p.areaSqft) || Math.round(Number(p.area) * 43560);

                  return (
                    <div
                      key={p.id}
                      className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/30 hover:bg-emerald-50/70 hover:border-emerald-300 transition-all flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 font-bold text-xs font-mono">
                          LP
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold font-mono text-emerald-900">{t('common.surveyNumber', 'Survey Number')} #{p.surveyNumber}</span>
                            <span className={cn(
                              "text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border",
                              isCommercial ? "bg-amber-50 text-amber-800 border-amber-200" :
                              isBuilding ? "bg-sky-50 text-sky-800 border-sky-200" :
                              "bg-white text-emerald-700 border-emerald-200"
                            )}>
                              {p.landUse || 'Agricultural'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 truncate mt-0.5">
                            {p.village}, {p.mandalName} ({p.districtName})
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        {isCommercial || isBuilding ? (
                          <>
                            <p className="text-sm font-black text-slate-900">{sqftVal.toLocaleString('en-IN')} {t('common.sqft', 'sq.ft')}</p>
                            <p className="text-[11px] text-slate-500 font-medium">{p.area} {t('common.acres', 'Acres')}</p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-black text-slate-900">{p.area} {t('common.acres', 'Acres')}</p>
                            <p className="text-[11px] text-slate-500 font-medium">{sqftVal.toLocaleString('en-IN')} {t('common.sqft', 'sq.ft')}</p>
                          </>
                        )}
                        <Link
                          to={`/citizen/gis?parcel=${p.id}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-0.5 hover:underline"
                        >
                          <span>{t('dashboard.viewMap', 'View Map')}</span>
                          <ArrowUpRight size={13} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-emerald-600" />
                {t('dashboard.cadastralSynced', 'Cadastral shapes synced with RoR')}
              </span>
              <Link to="/citizen/gis" className="font-bold text-emerald-700 hover:underline">
                {t('dashboard.openFullGis', 'Open Full GIS')} →
              </Link>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{t('dashboard.recentApplications')}</h3>
                    <p className="text-xs text-slate-500">{t('dashboard.trackRealtime', 'Track statutory progress in real-time')}</p>
                  </div>
                </div>
                <Link
                  to="/citizen/applications"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
                >
                  <span>{t('common.viewAll')}</span>
                  <ChevronRight size={14} />
                </Link>
              </div>

              {apps.length === 0 ? (
                <div className="text-center py-8">
                  <FileText size={36} className="text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-700">{t('application.noApplications')}</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    {t('dashboard.noActiveRequests', 'You currently have no active land service requests. Start an application to begin.')}
                  </p>
                  <Link
                    to="/citizen/apply"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all mt-4"
                  >
                    <Send size={14} />
                    <span>{t('nav.applyService')}</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {apps.slice(0, 4).map(app => (
                    <Link
                      key={app.id}
                      to={`/citizen/applications/${app.id}`}
                      className="p-4 rounded-2xl border border-slate-200/70 bg-slate-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-xs transition-all flex items-center justify-between gap-3 block group"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-bold font-mono text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {app.tokenNumber}
                          </span>
                          <StatusBadge status={app.status} />
                        </div>
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {app.serviceName}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {t('common.submittedOn', 'Submitted on')} {formatDate(app.submittedAt)}
                        </p>
                      </div>

                      <div className="flex items-center text-slate-400 group-hover:text-emerald-700 transition-colors">
                        <ChevronRight size={18} />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>{t('dashboard.stageTrackingEnabled', 'Horizontal stage tracking enabled')}</span>
              <Link to="/citizen/track" className="font-bold text-emerald-700 hover:underline">
                {t('dashboard.trackByToken', 'Track by Token ID →')}
              </Link>
            </div>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}
