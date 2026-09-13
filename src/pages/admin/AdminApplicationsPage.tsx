import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/appStore';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { formatDate } from '../../utils';
import { ClipboardList, Search, ChevronRight, Filter } from 'lucide-react';
import type { ApplicationStatus } from '../../types';

export function AdminApplicationsPage() {
  const { t } = useTranslation();
  const { applications } = useAppStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = applications.filter(app => {
    const matchesSearch =
      app.tokenNumber.toLowerCase().includes(search.toLowerCase()) ||
      app.citizenName.toLowerCase().includes(search.toLowerCase()) ||
      app.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      app.mandalName.toLowerCase().includes(search.toLowerCase()) ||
      app.surveyNumber.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <PageLayout role="admin">
      <DemoBanner />
      <PageHeader
        title="National Applications Registry"
        subtitle="Comprehensive view of all land governance transactions across all jurisdictions"
        breadcrumb={[{ label: 'Home' }, { label: t('nav.applications') }]}
      />

      <PageContent>
        {/* Controls */}
        <div className="gov-card flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              className="gov-input pl-8 text-xs"
              placeholder="Search by token, citizen, survey, mandal..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-brand-muted">Status:</span>
            <select
              className="gov-input text-xs w-auto"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="ROUTED">Routed</option>
              <option value="DOCUMENT_VERIFICATION">Document Verification</option>
              <option value="GIS_VERIFICATION">GIS Verification</option>
              <option value="FIELD_VERIFICATION">Field Verification</option>
              <option value="OFFICER_REVIEW">Officer Review</option>
              <option value="APPROVED">Approved</option>
              <option value="COMPLETED">Completed</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="gov-card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-brand-navy text-white">
                  <th className="py-2.5 px-3 font-semibold">Token Number</th>
                  <th className="py-2.5 px-3 font-semibold">Service</th>
                  <th className="py-2.5 px-3 font-semibold">Applicant</th>
                  <th className="py-2.5 px-3 font-semibold">Survey No</th>
                  <th className="py-2.5 px-3 font-semibold">Jurisdiction (Mandal / Dist)</th>
                  <th className="py-2.5 px-3 font-semibold">Assigned Officer</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                  <th className="py-2.5 px-3 font-semibold">Date</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gov-border">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-brand-muted">
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  filtered.map(app => (
                    <tr key={app.id} className="hover:bg-brand-light/30 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-brand-navy whitespace-nowrap">
                        {app.tokenNumber}
                      </td>
                      <td className="py-2.5 px-3 text-gray-800 font-medium whitespace-nowrap">
                        {app.serviceName}
                      </td>
                      <td className="py-2.5 px-3 text-gray-700 whitespace-nowrap">
                        {app.citizenName}
                      </td>
                      <td className="py-2.5 px-3 font-semibold whitespace-nowrap">
                        {app.surveyNumber}
                      </td>
                      <td className="py-2.5 px-3 text-gray-800 whitespace-nowrap">
                        {app.mandalName}, {app.districtName}
                      </td>
                      <td className="py-2.5 px-3 text-gray-700 whitespace-nowrap">
                        {app.assignedOfficerName || 'Jurisdiction Queue'}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <StatusBadge status={app.status as ApplicationStatus} />
                      </td>
                      <td className="py-2.5 px-3 text-gray-500 whitespace-nowrap text-[11px]">
                        {formatDate(app.submittedAt)}
                      </td>
                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        <Link
                          to={`/citizen/track?token=${app.tokenNumber}`}
                          className="text-blue-600 hover:underline font-medium text-[11px]"
                        >
                          Track
                        </Link>
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
