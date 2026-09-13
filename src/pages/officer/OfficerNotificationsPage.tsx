import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { formatDate } from '../../utils';
import { Bell, CheckCheck, FileText, ArrowRight } from 'lucide-react';
import type { OfficerProfile } from '../../types';

export function OfficerNotificationsPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const officer = user as OfficerProfile;
  const { getNotifications, markNotificationRead } = useAppStore();

  const notifications = officer ? getNotifications(officer.id) : [];
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAllRead = () => {
    notifications.forEach(n => {
      if (!n.isRead) markNotificationRead(n.id);
    });
  };

  return (
    <PageLayout role="officer">
      <DemoBanner />
      <PageHeader
        title={t('nav.notifications')}
        subtitle="Department assignments, application routing alerts, and statutory notices"
        breadcrumb={[{ label: 'Home' }, { label: t('nav.notifications') }]}
        action={
          unreadCount > 0 ? (
            <button
              onClick={handleMarkAllRead}
              className="gov-btn-secondary flex items-center gap-1.5 text-xs"
            >
              <CheckCheck size={14} />
              <span>Mark all as read</span>
            </button>
          ) : undefined
        }
      />

      <PageContent>
        {notifications.length === 0 ? (
          <div className="gov-card text-center py-12">
            <Bell size={36} className="text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-brand-navy">No notifications yet</p>
            <p className="text-xs text-brand-muted mt-1">
              New applications assigned to your mandal jurisdiction will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map(n => (
              <div
                key={n.id}
                className={`gov-card flex items-start gap-3 transition-colors ${
                  !n.isRead ? 'bg-emerald-50/40 border-emerald-200' : 'bg-white'
                }`}
              >
                <div className="mt-1 flex-shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      !n.isRead ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <Bell size={14} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-xs ${!n.isRead ? 'font-bold text-brand-navy' : 'font-semibold text-gray-700'}`}>
                      {n.title}
                    </p>
                    <span className="text-[10px] text-brand-muted whitespace-nowrap">
                      {formatDate(n.createdAt)}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {n.message}
                  </p>

                  <div className="flex items-center gap-4 mt-2">
                    {n.applicationId && (
                      <Link
                        to={`/officer/applications/${n.applicationId}`}
                        className="text-[11px] text-brand-green font-semibold hover:underline flex items-center gap-1"
                      >
                        Open Application
                        <ArrowRight size={10} />
                      </Link>
                    )}

                    {!n.isRead && (
                      <button
                        onClick={() => markNotificationRead(n.id)}
                        className="text-[10px] text-brand-muted hover:text-brand-navy ml-auto"
                      >
                        Mark as read
                      </button>
                    )}
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
