import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { DEMO_OFFICERS, DEMO_STATES, DEMO_DISTRICTS, DEMO_MANDALS } from '../../data/demoData';
import { toast } from '../../components/ui/Toast';
import { Building, Search, Plus, CheckCircle2, XCircle, Shield } from 'lucide-react';
import type { OfficerProfile } from '../../types';

export function OfficerManagementPage() {
  const { t } = useTranslation();
  const [officers, setOfficers] = useState<OfficerProfile[]>(DEMO_OFFICERS);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');

  const filteredOfficers = officers.filter(o => {
    const matchesSearch =
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.officerId.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase()) ||
      o.jurisdictionMandal.toLowerCase().includes(search.toLowerCase());

    const matchesDept = deptFilter === 'all' || o.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const toggleStatus = (officerId: string) => {
    setOfficers(prev =>
      prev.map(o => {
        if (o.id === officerId) {
          const updated = !o.isActive;
          toast('info', 'Status Updated', `${o.name} is now ${updated ? 'Active' : 'Inactive'}`);
          return { ...o, isActive: updated };
        }
        return o;
      })
    );
  };

  return (
    <PageLayout role="admin">
      <DemoBanner />
      <PageHeader
        title={t('admin.officerManagement')}
        subtitle="Manage government officers, authorized departments, and mandal jurisdiction postings"
        breadcrumb={[{ label: 'Home' }, { label: t('nav.officers') }]}
        action={
          <button
            onClick={() => toast('info', 'Demo Feature', 'New officer provisioning dialog')}
            className="gov-btn-primary flex items-center gap-1.5 text-xs shadow-sm"
          >
            <Plus size={14} />
            <span>Add New Officer</span>
          </button>
        }
      />

      <PageContent>
        {/* Filter Toolbar */}
        <div className="gov-card flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              className="gov-input pl-8 text-xs"
              placeholder="Search by name, ID, email, mandal..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-brand-muted">Department:</span>
            <select
              className="gov-input text-xs w-auto"
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
            >
              <option value="all">All Departments</option>
              <option value="Revenue">Revenue</option>
              <option value="Survey">Survey</option>
              <option value="Registration">Registration</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="gov-card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-brand-navy text-white">
                  <th className="py-2.5 px-3 font-semibold">Officer ID</th>
                  <th className="py-2.5 px-3 font-semibold">Official Name</th>
                  <th className="py-2.5 px-3 font-semibold">Department</th>
                  <th className="py-2.5 px-3 font-semibold">Designation</th>
                  <th className="py-2.5 px-3 font-semibold">Jurisdiction (Mandal / Dist)</th>
                  <th className="py-2.5 px-3 font-semibold">Official Email</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gov-border">
                {filteredOfficers.map(o => (
                  <tr key={o.id} className="hover:bg-brand-light/30 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-brand-navy whitespace-nowrap">
                      {o.officerId}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-gray-900 whitespace-nowrap">
                      {o.name}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
                        {o.department}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-700 whitespace-nowrap">
                      {o.designation}
                    </td>
                    <td className="py-2.5 px-3 text-gray-800 whitespace-nowrap">
                      <strong>{o.jurisdictionMandal.split('-').pop()}</strong> ({o.jurisdictionDistrict.split('-').pop()}, {o.jurisdictionState})
                    </td>
                    <td className="py-2.5 px-3 text-brand-muted whitespace-nowrap font-mono text-[11px]">
                      {o.email}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                          o.isActive
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {o.isActive ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                        {o.isActive ? 'ACTIVE' : 'SUSPENDED'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => toggleStatus(o.id)}
                        className={`text-[11px] font-medium px-2 py-1 rounded transition-colors ${
                          o.isActive
                            ? 'text-red-700 hover:bg-red-50'
                            : 'text-emerald-700 hover:bg-emerald-50'
                        }`}
                      >
                        {o.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}
