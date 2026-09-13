import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { formatDate } from '../../utils';
import { BookOpen, Search, Shield, Filter, Calendar } from 'lucide-react';
import type { OfficerProfile } from '../../types';

export function OfficerAuditPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const officer = user as OfficerProfile;
  const { getAuditLogs } = useAppStore();

  const [search, setSearch] = useState('');
  const logs = getAuditLogs();

  const filteredLogs = logs.filter(log =>
    log.action.toLowerCase().includes(search.toLowerCase()) ||
    log.details.toLowerCase().includes(search.toLowerCase()) ||
    log.userName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageLayout role="officer">
      <DemoBanner />
      <PageHeader
        title={t('nav.auditTrail')}
        subtitle="Immutable statutory ledger of land governance actions, verifications, and approvals"
        breadcrumb={[{ label: 'Home' }, { label: t('nav.auditTrail') }]}
      />

      <PageContent>
        {/* Filter bar */}
        <div className="gov-card flex items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              className="gov-input pl-8 text-xs"
              placeholder="Filter by action, officer name, token..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <span className="text-xs text-brand-muted hidden sm:inline">
            Showing <strong>{filteredLogs.length}</strong> logged transactions
          </span>
        </div>

        {/* Audit Log Table */}
        <div className="gov-card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-brand-navy text-white border-b border-gov-border">
                  <th className="py-2.5 px-3 font-semibold">Timestamp</th>
                  <th className="py-2.5 px-3 font-semibold">Actor / Officer</th>
                  <th className="py-2.5 px-3 font-semibold">Role</th>
                  <th className="py-2.5 px-3 font-semibold">Action</th>
                  <th className="py-2.5 px-3 font-semibold">Entity Type</th>
                  <th className="py-2.5 px-3 font-semibold">Transaction Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gov-border">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-brand-muted">
                      No audit logs match your query.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map(log => (
                    <tr key={log.id} className="hover:bg-brand-light/50 transition-colors">
                      <td className="py-2.5 px-3 text-gray-500 whitespace-nowrap font-mono text-[11px]">
                        {formatDate(log.timestamp)}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-brand-navy whitespace-nowrap">
                        {log.userName}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          log.userRole === 'officer'
                            ? 'bg-emerald-100 text-emerald-800'
                            : log.userRole === 'admin'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {log.userRole}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-gray-700 font-semibold whitespace-nowrap">
                        {log.action}
                      </td>
                      <td className="py-2.5 px-3 text-brand-muted uppercase text-[10px] whitespace-nowrap">
                        {log.entityType}
                      </td>
                      <td className="py-2.5 px-3 text-gray-700 max-w-xs truncate">
                        {log.details}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}
