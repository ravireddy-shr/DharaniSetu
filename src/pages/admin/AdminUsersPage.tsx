import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { DEMO_REGISTERED_CITIZENS } from '../../data/demoData';
import { formatDate } from '../../utils';
import {
  Users, Search, ShieldCheck, CheckCircle2, Phone, Mail,
  MapPin, Layers, CreditCard, ChevronRight, UserCheck
} from 'lucide-react';

export function AdminUsersPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('ALL');

  const filteredUsers = DEMO_REGISTERED_CITIZENS.filter(citizen => {
    const matchesSearch =
      citizen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      citizen.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (citizen.phone && citizen.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (citizen.aadhaarMasked && citizen.aadhaarMasked.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (citizen.passbookNumber && citizen.passbookNumber.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesState = stateFilter === 'ALL' || citizen.state === stateFilter;

    return matchesSearch && matchesState;
  });

  return (
    <PageLayout role="admin">
      <DemoBanner />
      <PageHeader
        title="Registered Citizens & Landowners"
        subtitle="Master directory of verified citizen identities, UIDAI e-KYC credentials, and Pattadar passbooks"
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Registered Citizens' }]}
        action={
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-2 shadow-xs">
              <UserCheck size={15} className="text-emerald-600" />
              {DEMO_REGISTERED_CITIZENS.length} Verified Citizens Active
            </span>
          </div>
        }
      />

      <PageContent>
        {/* Controls */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="Search by name, Aadhaar, passbook, phone..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap">{t('admin.filterState', 'Filter State:')}</span>
            <select
              value={stateFilter}
              onChange={e => setStateFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">{t('admin.all4States', 'All 4 States')}</option>
              <option value="Andhra Pradesh">{t('contact.states.AP.name', 'Andhra Pradesh')}</option>
              <option value="Telangana">{t('contact.states.TS.name', 'Telangana')}</option>
              <option value="Tamil Nadu">{t('contact.states.TN.name', 'Tamil Nadu')}</option>
              <option value="Chandigarh">{t('contact.states.CH.name', 'Chandigarh')}</option>
            </select>
          </div>
        </div>

        {/* Citizens Directory Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50/80 text-slate-600 uppercase font-bold border-b border-slate-200/80 tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">{t('admin.citizenAndIdentity', 'Citizen & Identity')}</th>
                  <th className="py-3.5 px-4">{t('admin.contactInfo', 'Contact Info')}</th>
                  <th className="py-3.5 px-4">{t('admin.jurisdictionAddress', 'Jurisdiction & Address')}</th>
                  <th className="py-3.5 px-4">{t('admin.pattadarPassbook', 'Pattadar Passbook')}</th>
                  <th className="py-3.5 px-4">{t('admin.landholdings', 'Landholdings')}</th>
                  <th className="py-3.5 px-4">{t('admin.calculatedExtent', 'Calculated Extent')}</th>
                  <th className="py-3.5 px-4">{t('admin.kycStatus', 'KYC Status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map(citizen => (
                  <tr key={citizen.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-slate-900 text-emerald-400 font-black flex items-center justify-center text-xs">
                          {citizen.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{citizen.name}</p>
                          <p className="font-mono text-[10px] text-slate-500">{citizen.aadhaarMasked}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <p className="font-medium text-slate-800 flex items-center gap-1">
                          <Phone size={11} className="text-emerald-600" />
                          {citizen.phone}
                        </p>
                        <p className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Mail size={11} className="text-slate-400" />
                          {citizen.email}
                        </p>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-800">{citizen.mandal}, {citizen.district}</p>
                      <p className="text-[10px] text-emerald-700 font-semibold">{citizen.state}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                        {citizen.passbookNumber || 'PB-2026-00000'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800">{citizen.parcelsCount || 1} Parcels</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-bold text-emerald-800">{citizen.totalAreaAcres || 1.0} Acres</p>
                      <p className="font-mono text-[10px] text-slate-500">
                        {Math.round((citizen.totalAreaAcres || 1.0) * 43560).toLocaleString('en-IN')} sq.ft
                      </p>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 size={11} className="text-emerald-600" />
                        e-KYC Verified
                      </span>
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
