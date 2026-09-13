import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import {
  DEMO_STATES, DEMO_DISTRICTS, DEMO_MANDALS, DEMO_OFFICERS,
  getDistrictsByState, getMandalsByDistrict, getOfficersForMandal
} from '../../data/demoData';
import { Globe2, MapPin, Building, ChevronRight, User, ShieldCheck } from 'lucide-react';

export function JurisdictionManagementPage() {
  const { t } = useTranslation();
  const [selectedState, setSelectedState] = useState<string>('AP');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('AP-GNT');
  const [selectedMandal, setSelectedMandal] = useState<string>('AP-GNT-GNT');

  const districts = getDistrictsByState(selectedState);
  const mandals = getMandalsByDistrict(selectedDistrict);
  const officers = getOfficersForMandal(selectedMandal);

  return (
    <PageLayout role="admin">
      <DemoBanner />
      <PageHeader
        title={t('admin.jurisdictionManagement')}
        subtitle="National administrative tree: State → District → Mandal → Authorized Officers"
        breadcrumb={[{ label: 'Home' }, { label: t('nav.states') }]}
      />

      <PageContent>
        {/* Routing Architecture Summary */}
        <div className="gov-card bg-brand-navy text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-saffron">
              Deterministic Statutory Jurisdiction
            </span>
            <h3 className="text-base font-bold mt-0.5">Jurisdiction-Based Application Routing</h3>
            <p className="text-xs text-white/80 mt-1 max-w-xl">
              Citizens submit applications for land parcels anywhere in the country. The routing engine inspects the parcel's Mandal ID and directs the application to the corresponding Mandal Officer.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg border border-white/20">
            <ShieldCheck size={18} className="text-emerald-400" />
            <span className="text-xs font-semibold">100% Jurisdictional Integrity Guaranteed</span>
          </div>
        </div>

        {/* Interactive 3-Column Hierarchy Explorer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1: States */}
          <div className="gov-card">
            <div className="flex items-center gap-2 text-brand-navy font-semibold text-sm mb-3 pb-2 border-b border-gov-border">
              <Globe2 size={16} className="text-blue-600" />
              <span>1. States ({DEMO_STATES.length})</span>
            </div>
            <div className="space-y-1.5">
              {DEMO_STATES.map(s => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedState(s.id);
                    const dists = getDistrictsByState(s.id);
                    if (dists[0]) {
                      setSelectedDistrict(dists[0].id);
                      const mands = getMandalsByDistrict(dists[0].id);
                      if (mands[0]) setSelectedMandal(mands[0].id);
                    }
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded text-xs transition-colors text-left ${
                    selectedState === s.id
                      ? 'bg-brand-navy text-white font-semibold shadow-sm'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span>{s.name}</span>
                  <span className="font-mono text-[10px] opacity-80">({s.code})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Districts */}
          <div className="gov-card">
            <div className="flex items-center gap-2 text-brand-navy font-semibold text-sm mb-3 pb-2 border-b border-gov-border">
              <MapPin size={16} className="text-emerald-600" />
              <span>2. Districts in {selectedState} ({districts.length})</span>
            </div>
            <div className="space-y-1.5">
              {districts.map(d => (
                <button
                  key={d.id}
                  onClick={() => {
                    setSelectedDistrict(d.id);
                    const mands = getMandalsByDistrict(d.id);
                    if (mands[0]) setSelectedMandal(mands[0].id);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded text-xs transition-colors text-left ${
                    selectedDistrict === d.id
                      ? 'bg-brand-navy text-white font-semibold shadow-sm'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span>{d.name}</span>
                  <ChevronRight size={14} className={selectedDistrict === d.id ? 'opacity-100' : 'opacity-40'} />
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Mandals */}
          <div className="gov-card">
            <div className="flex items-center gap-2 text-brand-navy font-semibold text-sm mb-3 pb-2 border-b border-gov-border">
              <Building size={16} className="text-amber-600" />
              <span>3. Mandals in District ({mandals.length})</span>
            </div>
            <div className="space-y-1.5">
              {mandals.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMandal(m.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded text-xs transition-colors text-left ${
                    selectedMandal === m.id
                      ? 'bg-brand-navy text-white font-semibold shadow-sm'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span>{m.name}</span>
                  <span className="font-mono text-[10px] opacity-75">{m.id.split('-').pop()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Assigned Officer for Selected Mandal */}
        <div className="gov-card">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gov-border">
            <div className="flex items-center gap-2 text-brand-navy font-semibold text-sm">
              <User size={16} className="text-brand-green" />
              <span>
                Authorized Processing Officers for Mandal: <strong>{mandals.find(m => m.id === selectedMandal)?.name || selectedMandal}</strong>
              </span>
            </div>
            <span className="text-xs text-brand-muted">
              {officers.length} Officer(s) assigned
            </span>
          </div>

          {officers.length === 0 ? (
            <div className="p-4 bg-amber-50 rounded border border-amber-200 text-xs text-amber-800">
              No officer is directly mapped to this mandal yet. Incoming applications will route to the district backup queue.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {officers.map(o => (
                <div key={o.id} className="p-3 rounded-lg border border-gov-border bg-gray-50/50 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-light text-brand-navy flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {o.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-brand-navy">{o.name}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-emerald-100 text-emerald-800">
                        {o.department}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 mt-0.5">{o.designation}</p>
                    <p className="text-[11px] text-brand-muted font-mono mt-1">{o.email}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">ID: {o.officerId}</p>
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
