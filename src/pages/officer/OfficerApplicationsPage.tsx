import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { formatDate } from '../../utils';
import { ClipboardList, Search, ChevronRight, CheckSquare, Shield, FileCheck, Filter, MapPin, Lock } from 'lucide-react';
import type { OfficerProfile, ApplicationStatus } from '../../types';

export function OfficerApplicationsPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const { user } = useAuthStore();
  const officer = user as OfficerProfile;
  const { getApplicationsForOfficer, syncWithSupabase } = useAppStore();

  useEffect(() => {
    syncWithSupabase();
  }, [syncWithSupabase]);

  // Determine active tab from route or local state
  const isPendingRoute = location.pathname.includes('/pending');
  const isApprovalsRoute = location.pathname.includes('/approvals');
  const isCompletedRoute = location.pathname.includes('/completed');

  const routeTab = isPendingRoute ? 'pending' : isApprovalsRoute ? 'approvals' : isCompletedRoute ? 'completed' : 'all';
  const [filter, setFilter] = useState<'all' | 'pending' | 'approvals' | 'completed'>(routeTab);
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Keep filter synced if user navigates via sidebar routes
  useEffect(() => {
    setFilter(routeTab);
  }, [routeTab]);

  const apps = officer ? getApplicationsForOfficer(officer.id) : [];

  const pendingApps = apps.filter(a => ['SUBMITTED', 'ROUTED', 'DOCUMENT_VERIFICATION', 'GIS_VERIFICATION', 'FIELD_VERIFICATION'].includes(a.status));
  const approvalApps = apps.filter(a => a.status === 'OFFICER_REVIEW');
  const completedApps = apps.filter(a => ['APPROVED', 'REJECTED', 'RECORD_UPDATE', 'COMPLETED'].includes(a.status));

  const filteredApps = apps.filter(app => {
    const matchesSearch =
      app.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.surveyNumber.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (deptFilter !== 'all' && app.currentDepartment !== deptFilter) {
      return false;
    }

    if (filter === 'pending') {
      return ['SUBMITTED', 'ROUTED', 'DOCUMENT_VERIFICATION', 'GIS_VERIFICATION', 'FIELD_VERIFICATION'].includes(app.status);
    }
    if (filter === 'approvals') {
      return app.status === 'OFFICER_REVIEW';
    }
    if (filter === 'completed') {
      return ['APPROVED', 'REJECTED', 'RECORD_UPDATE', 'COMPLETED'].includes(app.status);
    }
    return true;
  });

  return (
    <PageLayout role="officer">
      <DemoBanner />
      <PageHeader
        title={
          filter === 'pending' ? 'Pending Verifications Queue'
          : filter === 'approvals' ? 'Final Approvals & Orders Queue'
          : filter === 'completed' ? 'Completed & Disposed Records'
          : 'Tahsildar Application Repository'
        }
        subtitle={officer ? `Official Jurisdiction: ${officer.jurisdictionMandal}, ${officer.jurisdictionDistrict} (${officer.jurisdictionState})` : ''}
        breadcrumb={[{ label: 'Home' }, { label: t('nav.applications') }]}
      />

      <PageContent>
        {/* Tab Selection Strip */}
        <div className="flex bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 gap-1 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filter === 'all'
                ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <ClipboardList size={15} className={filter === 'all' ? 'text-emerald-600' : 'text-slate-400'} />
            <span>{t('officer.allApplications', 'All Applications')}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${filter === 'all' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
              {apps.length}
            </span>
          </button>

          <button
            onClick={() => setFilter('pending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filter === 'pending'
                ? 'bg-white text-amber-900 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <CheckSquare size={15} className={filter === 'pending' ? 'text-amber-600' : 'text-slate-400'} />
            <span>{t('officer.pendingVerification', 'Pending Verification')}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${filter === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'}`}>
              {pendingApps.length}
            </span>
          </button>

          <button
            onClick={() => setFilter('approvals')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filter === 'approvals'
                ? 'bg-white text-blue-900 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Shield size={15} className={filter === 'approvals' ? 'text-blue-600' : 'text-slate-400'} />
            <span>{t('officer.approvalsSignings', 'Approvals & Signings')}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${filter === 'approvals' ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-700'}`}>
              {approvalApps.length}
            </span>
          </button>

          <button
            onClick={() => setFilter('completed')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filter === 'completed'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <FileCheck size={15} className={filter === 'completed' ? 'text-emerald-600' : 'text-slate-400'} />
            <span>{t('officer.completedDisposed', 'Completed & Disposed')}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${filter === 'completed' ? 'bg-slate-200 text-slate-800' : 'bg-slate-200 text-slate-700'}`}>
              {completedApps.length}
            </span>
          </button>
        </div>

        {/* Department Queue Quick Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-bold uppercase text-[11px] whitespace-nowrap">{t('officer.departmentDesk', 'Department Desk')}:</span>
          {['all', 'Revenue', 'Survey', 'Town Planning', 'Tahsildar'].map(dept => (
            <button
              key={dept}
              onClick={() => setDeptFilter(dept)}
              className={`px-3 py-1 rounded-xl font-bold transition-all whitespace-nowrap ${
                deptFilter === dept
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {dept === 'all' ? t('officer.allDepartments', 'All Departments') : t(`officer.${dept.toLowerCase().replace(/\s+/g, '')}`, dept)}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder={t('officer.searchOfficerPlaceholder', 'Search by Token ID, Citizen Name, Survey Number, or Service...')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-500 hover:text-slate-700 font-semibold px-2 py-1"
            >
              {t('common.clear', 'Clear')}
            </button>
          )}
        </div>

        {/* List of Applications */}
        {filteredApps.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 text-center py-16 px-4 shadow-xs">
            <ClipboardList size={42} className="text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-800">{t('officer.noAppsInQueue', 'No applications found in this queue')}</p>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              {t('officer.appsSyncNotice', {
                jurisdiction: officer?.jurisdictionMandal || 'your jurisdiction',
                defaultValue: `Any citizen applications submitted within ${officer?.jurisdictionMandal || 'your jurisdiction'} will immediately sync here.`
              })}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredApps.map(app => {
              const isAdmin = officer?.role === 'admin' || officer?.id === 'ADM-001' || (officer?.id && officer.id.startsWith('ADM'));
              const appDept = app.currentDepartment || 'Revenue';
              const isAtMyDesk = isAdmin || (officer?.department && officer.department.toLowerCase() === appDept.toLowerCase());

              return (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center font-black text-xs">
                        DS
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-sm font-bold text-slate-900">
                            {app.tokenNumber}
                          </span>
                          <StatusBadge status={app.status as ApplicationStatus} />
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                            {t('officer.desk', 'Desk')}: {t(`officer.${appDept.toLowerCase().replace(/\s+/g, '')}`, appDept)}
                          </span>
                          {isAtMyDesk ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                              {isAdmin ? t('officer.adminMasterControl', 'Admin Master Control') : t('officer.actionRequiredAtDesk', 'Action Required at Your Desk')}
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-300 flex items-center gap-1">
                              <Lock size={10} className="text-slate-400" />
                              {t('officer.pendingAtDesk', { dept: appDept, defaultValue: `Pending at ${appDept} Desk (Read-Only)` })}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-bold text-emerald-800 mt-0.5">
                          {app.serviceName}
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{t('common.submittedOn', 'Submitted On')}</span>
                      <p className="text-xs font-semibold text-slate-700">{formatDate(app.submittedAt)}</p>
                    </div>
                  </div>

                  <div className="pt-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 uppercase text-[10px] font-bold">{t('common.applicant', 'Applicant')}</span>
                        <p className="font-bold text-slate-800 mt-0.5">{app.citizenName}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 uppercase text-[10px] font-bold">{t('common.surveyNumber', 'Survey Number')}</span>
                        <p className="font-bold text-emerald-700 mt-0.5">{app.surveyNumber}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 uppercase text-[10px] font-bold">{t('common.villageMandal', 'Village & Mandal')}</span>
                        <p className="font-medium text-slate-700 mt-0.5">{app.village}, {app.mandalName}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 uppercase text-[10px] font-bold">{t('common.extentApplied', 'Extent Applied')}</span>
                        <p className="font-bold text-slate-800 mt-0.5">
                          {app.aiDiscrepancy?.deedArea || 1.0} {t('common.acres', 'Acres')}
                          <span className="text-[10px] text-slate-500 font-normal ml-1">
                            ({Math.round((app.aiDiscrepancy?.deedArea || 1.0) * 43560).toLocaleString('en-IN')} {t('common.sqft', 'sq.ft')})
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-end lg:self-center">
                      <Link
                        to={`/officer/gis?parcel=${app.parcelId}`}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <MapPin size={13} className="text-emerald-600" />
                        GIS Cadastral
                      </Link>
                      <Link
                        to={`/officer/applications/${app.id}`}
                        className={`px-4 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all ${
                          isAtMyDesk
                            ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                        }`}
                      >
                        <span>{isAtMyDesk ? 'Process & Scrutinize' : 'View Status'}</span>
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </PageContent>
    </PageLayout>
  );
}
