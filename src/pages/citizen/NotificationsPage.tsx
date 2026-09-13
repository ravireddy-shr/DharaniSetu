import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { formatDate } from '../../utils';
import { Bell, CheckCheck, ArrowRight, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

export function NotificationsPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { getNotifications, markNotificationRead, markAllNotificationsRead } = useAppStore();

  const notifications = user ? getNotifications(user.id) : [];
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAllRead = () => {
    if (user) markAllNotificationsRead(user.id);
  };

  return (
    <PageLayout role="citizen">
      <DemoBanner />
      <PageHeader
        title={t('nav.notifications')}
        subtitle="Real-time statutory status updates, revenue officer notices, and verification alerts"
        breadcrumb={[{ label: 'Home', path: '/citizen/dashboard' }, { label: t('nav.notifications') }]}
        action={
          unreadCount > 0 ? (
            <button
              onClick={handleMarkAllRead}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <CheckCheck size={14} />
              <span>Mark all as read ({unreadCount})</span>
            </button>
          ) : (
            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              All caught up
            </span>
          )
        }
      />

      <PageContent>
        <div className="max-w-4xl mx-auto space-y-4">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-sm">
              <Bell size={40} className="text-slate-300 mx-auto mb-3" />
              <p className="text-base font-bold text-slate-800">No Notifications Yet</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                You will receive statutory stage updates, DGPS survey schedules, and Tahsildar approvals here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map(n => (
                <div
                  key={n.id}
                  onClick={() => { if (!n.isRead) markNotificationRead(n.id); }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    !n.isRead
                      ? 'bg-blue-50/50 border-blue-200/90 shadow-sm'
                      : 'bg-white border-slate-200/80 hover:bg-slate-50/50 shadow-xs'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        !n.isRead ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <Bell size={18} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm ${!n.isRead ? 'font-black text-slate-900' : 'font-semibold text-slate-800'}`}>
                          {n.title}
                        </p>
                        {!n.isRead && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                        )}
                      </div>
                      <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">
                        {formatDate(n.createdAt)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {n.message}
                    </p>

                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                      {n.tokenNumber && (
                        <Link
                          to={`/citizen/track?token=${n.tokenNumber}`}
                          onClick={(e) => { e.stopPropagation(); markNotificationRead(n.id); }}
                          className="text-xs text-emerald-700 hover:text-emerald-800 flex items-center gap-1 font-mono font-bold hover:underline"
                        >
                          <span>Track {n.tokenNumber}</span>
                          <ExternalLink size={12} />
                        </Link>
                      )}

                      {n.applicationId && (
                        <Link
                          to={`/citizen/applications/${n.applicationId}`}
                          onClick={(e) => { e.stopPropagation(); markNotificationRead(n.id); }}
                          className="text-xs text-blue-700 hover:text-blue-800 flex items-center gap-1 font-bold hover:underline"
                        >
                          <span>View Application Details</span>
                          <ArrowRight size={12} />
                        </Link>
                      )}

                      {!n.isRead && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markNotificationRead(n.id);
                          }}
                          className="text-[11px] font-bold text-slate-400 hover:text-slate-700 ml-auto"
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
        </div>
      </PageContent>
    </PageLayout>
  );
}
