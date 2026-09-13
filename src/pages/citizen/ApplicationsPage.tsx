import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { formatDate } from '../../utils';
import { ClipboardList, Plus, Search, ChevronRight, FileText } from 'lucide-react';
import type { ApplicationStatus } from '../../types';

export function ApplicationsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getApplicationsForCitizen, syncWithSupabase } = useAppStore();

  useEffect(() => {
    syncWithSupabase();
  }, [syncWithSupabase]);

  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allApps = user ? getApplicationsForCitizen(user.id, user.email, user.name) : [];

  const filteredApps = allApps.filter(app => {
    const matchesSearch =
      app.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.surveyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.village.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === 'active') {
      return !['COMPLETED', 'REJECTED'].includes(app.status);
    }
    if (filter === 'completed') {
      return ['COMPLETED', 'APPROVED'].includes(app.status);
    }
    if (filter === 'rejected') {
      return app.status === 'REJECTED';
    }
    return true;
  });

  return (
    <PageLayout role="citizen">
      <DemoBanner />
      <PageHeader
        title={t('nav.myApplications')}
        subtitle={t('application.manageRequests', 'Track and manage all your government land service requests')}
        breadcrumb={[{ label: t('nav.home', 'Home') }, { label: t('nav.myApplications') }]}
        action={
          <Link
            to="/citizen/apply"
            className="gov-btn-primary flex items-center gap-1.5 text-xs shadow-sm"
          >
            <Plus size={14} />
            <span>{t('nav.applyService')}</span>
          </Link>
        }
      />

      <PageContent>
        {/* Controls */}
        <div className="gov-card flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              className="gov-input pl-8 text-xs"
              placeholder={t('application.searchPlaceholder', 'Search by token, survey number, service...')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter tabs */}
          <div className="flex bg-gray-100 p-1 rounded-md text-xs font-medium w-full sm:w-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded transition-colors ${
                filter === 'all' ? 'bg-white text-brand-navy shadow-sm font-semibold' : 'text-gray-600 hover:text-brand-navy'
              }`}
            >
              {t('common.allServices', 'All')} ({allApps.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1 rounded transition-colors ${
                filter === 'active' ? 'bg-white text-brand-navy shadow-sm font-semibold' : 'text-gray-600 hover:text-brand-navy'
              }`}
            >
              {t('dashboard.activeApplications', 'Active')} ({allApps.filter(a => !['COMPLETED', 'REJECTED'].includes(a.status)).length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded transition-colors ${
                filter === 'completed' ? 'bg-white text-emerald-800 shadow-sm font-semibold' : 'text-gray-600 hover:text-brand-navy'
              }`}
            >
              {t('dashboard.completedApplications', 'Completed')} ({allApps.filter(a => ['COMPLETED', 'APPROVED'].includes(a.status)).length})
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`px-3 py-1 rounded transition-colors ${
                filter === 'rejected' ? 'bg-white text-rose-800 shadow-sm font-semibold' : 'text-gray-600 hover:text-rose-700'
              }`}
            >
              {t('status.rejected', 'Rejected')} ({allApps.filter(a => a.status === 'REJECTED').length})
            </button>
          </div>
        </div>

        {/* List */}
        {filteredApps.length === 0 ? (
          <div className="gov-card text-center py-12">
            <ClipboardList size={36} className="text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-brand-navy">{t('application.noApplications', 'No applications found')}</p>
            <p className="text-xs text-brand-muted mt-1 max-w-sm mx-auto">
              {searchQuery ? t('application.adjustSearch', 'Try adjusting your search criteria.') : t('application.noSubmittedYet', 'You have not submitted any service applications yet.')}
            </p>
            {!searchQuery && (
              <button
                onClick={() => navigate('/citizen/apply')}
                className="gov-btn-primary text-xs mt-4"
              >
                {t('nav.applyService', 'Apply for a Service')}
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredApps.map(app => (
              <div
                key={app.id}
                className="gov-card hover:border-brand-navy transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gov-border pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                      <FileText size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-sm font-bold text-brand-navy">
                          {app.tokenNumber}
                        </span>
                        <StatusBadge status={app.status as ApplicationStatus} />
                      </div>
                      <p className="text-xs text-brand-muted mt-0.5">
                        {app.serviceName}
                      </p>
                    </div>
                  </div>

                  <div className="text-right sm:text-right">
                    <span className="text-[11px] text-brand-muted">{t('application.submitted', 'Submitted on')}</span>
                    <p className="text-xs font-medium text-gray-700">{formatDate(app.submittedAt)}</p>
                  </div>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 text-xs">
                    <div>
                      <span className="text-brand-muted uppercase text-[10px]">{t('common.surveyNumber', 'Survey No')}</span>
                      <p className="font-medium text-gray-800">{app.surveyNumber}</p>
                    </div>
                    <div>
                      <span className="text-brand-muted uppercase text-[10px]">{t('common.landParcel', 'Location')}</span>
                      <p className="font-medium text-gray-800">{app.village}, {app.mandalName}</p>
                    </div>
                    <div>
                      <span className="text-brand-muted uppercase text-[10px]">{t('common.jurisdictionOfficer', 'Assigned Officer')}</span>
                      <p className="font-medium text-gray-800">{app.assignedOfficerName || t('appDetail.jurisdictionQueue', 'Jurisdiction Queue')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Link
                      to={`/citizen/track?token=${app.tokenNumber}`}
                      className="px-3 py-1.5 rounded border border-gov-border text-xs text-brand-navy hover:bg-brand-light font-medium"
                    >
                      {t('common.trackLiveProgress', 'Track Live')}
                    </Link>
                    <Link
                      to={`/citizen/applications/${app.id}`}
                      className="gov-btn-primary flex items-center gap-1 text-xs"
                    >
                      <span>{t('common.viewAll', 'View Details')}</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </PageContent>
    </PageLayout>
  );
}
