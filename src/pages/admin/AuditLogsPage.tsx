import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/appStore';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { formatDate } from '../../utils';
import { BookOpen, Search, Shield, Filter, Download } from 'lucide-react';

export function AuditLogsPage() {
  const { t } = useTranslation();
  const { getAuditLogs } = useAppStore();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const logs = getAuditLogs();

  const filteredLogs = logs.filter(log => {
    const matchesSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      log.userName.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === 'all' || log.userRole === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <PageLayout role="admin">
      <DemoBanner />
      <PageHeader
        title={t('admin.systemOverview') + ' — ' + t('nav.auditLogs')}
        subtitle="National statutory audit trail and cryptographic action ledger"
        breadcrumb={[{ label: 'Home' }, { label: t('nav.auditLogs') }]}
        action={
          <button
            onClick={() => alert('Exporting audit log CSV')}
            className="gov-btn-secondary flex items-center gap-1.5 text-xs shadow-sm"
          >
            <Download size={14} />
            <span>Export Audit Trail</span>
          </button>
        }
      />

      <PageContent>
        {/* Filter bar */}
        <div className="gov-card flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              className="gov-input pl-8 text-xs"
              placeholder="Search by action, actor, token..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-brand-muted">Filter by Role:</span>
            <select
              className="gov-input text-xs w-auto"
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="citizen">Citizen</option>
              <option value="officer">Officer</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="gov-card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-brand-navy text-white">
                  <th className="py-2.5 px-3 font-semibold">Timestamp</th>
                  <th className="py-2.5 px-3 font-semibold">Actor / User</th>
                  <th className="py-2.5 px-3 font-semibold">Role</th>
                  <th className="py-2.5 px-3 font-semibold">Statutory Action</th>
                  <th className="py-2.5 px-3 font-semibold">Entity Type</th>
                  <th className="py-2.5 px-3 font-semibold">Action Description & Audit Payload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gov-border">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-brand-muted">
                      No audit records match your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map(log => (
                    <tr key={log.id} className="hover:bg-brand-light/40 transition-colors">
                      <td className="py-2.5 px-3 text-gray-500 font-mono text-[11px] whitespace-nowrap">
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
                      <td className="py-2.5 px-3 font-mono text-[11px] text-gray-800 font-bold whitespace-nowrap">
                        {log.action}
                      </td>
                      <td className="py-2.5 px-3 text-brand-muted uppercase text-[10px] whitespace-nowrap">
                        {log.entityType}
                      </td>
                      <td className="py-2.5 px-3 text-gray-700 max-w-sm truncate">
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
