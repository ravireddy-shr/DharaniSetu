import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageLayout, PageHeader, PageContent } from '../../components/layout/PageLayout';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { DEMO_PARCELS, getParcelsForCitizen } from '../../data/demoData';
import { Map, MapPin, Info, Search, User } from 'lucide-react';
import { cn } from '../../utils';

export function MyLandPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const storeParcels = useAppStore(state => state.parcels);
  const [selected, setSelected] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const allParcelsPool = storeParcels.length > 0 ? storeParcels : DEMO_PARCELS;
  const myOwnedParcels = user ? getParcelsForCitizen(user.state, user.name, user.email, allParcelsPool) : [];

  const parcels = myOwnedParcels.filter(p => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.surveyNumber.toLowerCase().includes(q) ||
        p.ulpin.toLowerCase().includes(q) ||
        p.village.toLowerCase().includes(q) ||
        p.mandalName.toLowerCase().includes(q) ||
        p.districtName.toLowerCase().includes(q) ||
        p.recordedOwner.toLowerCase().includes(q)
      );
    }
    return true;
  });


  return (
    <PageLayout role="citizen">
      <PageHeader
        title={t('land.myLandTitle', 'Registered Land Parcels Repository')}
        subtitle="View, verify and inspect cadastral records for your registered land parcels"
        breadcrumb={[{ label: 'Home', path: '/citizen/dashboard' }, { label: t('nav.myLand', 'My Land') }]}
      />
      <PageContent>
        {/* Search & My Land Header */}
        <div className="flex flex-col gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-700 text-white shadow-xs flex items-center gap-1.5">
                <User size={13} />
                <span>My Registered Land ({myOwnedParcels.length})</span>
              </div>
            </div>

            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search survey no, ULPIN, village, owner..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        {parcels.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-slate-200 text-xs text-slate-500">
            No registered landholdings found matching your filter or profile.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parcels.map(p => {
              const isCommercial = (p.landUse || '').toLowerCase() === 'commercial';
              const isBuilding = ['residential', 'industrial', 'building', 'buildings'].includes((p.landUse || '').toLowerCase());
              const sqftVal = Number(p.areaSqft) || Math.round(Number(p.area) * 43560);

              return (
              <div
                key={p.id}
                className={cn('gov-card cursor-pointer border-2 transition-all', selected === p.id ? 'border-brand-navy' : 'border-transparent hover:border-gray-300')}
                onClick={() => setSelected(selected === p.id ? null : p.id)}
              >
                {/* Parcel header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center">
                      <MapPin size={16} className="text-brand-green" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-navy">Survey No. {p.surveyNumber}</p>
                      <p className="text-xs text-brand-muted">{p.village}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={cn(
                      "text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border",
                      isCommercial ? "bg-amber-50 text-amber-800 border-amber-200" :
                      isBuilding ? "bg-sky-50 text-sky-800 border-sky-200" :
                      "bg-emerald-50 text-emerald-800 border-emerald-200"
                    )}>
                      {p.landUse || 'Agricultural'}
                    </span>
                    <span className={cn('text-xs px-2 py-0.5 rounded font-medium',
                      p.recordStatus === 'Clear' ? 'bg-green-50 text-green-700' :
                      p.recordStatus === 'Disputed' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
                    )}>{p.recordStatus}</span>
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mb-3">
                  <div>
                    <p className="text-brand-muted uppercase tracking-wide" style={{ fontSize: '9px' }}>{t('land.district')}</p>
                    <p className="text-gov-text font-medium mt-0.5">{p.districtName}</p>
                  </div>
                  <div>
                    <p className="text-brand-muted uppercase tracking-wide" style={{ fontSize: '9px' }}>{t('land.mandal')}</p>
                    <p className="text-gov-text font-medium mt-0.5">{p.mandalName}</p>
                  </div>
                  <div>
                    <p className="text-brand-muted uppercase tracking-wide" style={{ fontSize: '9px' }}>Primary Extent</p>
                    <p className="text-gov-text font-black mt-0.5 text-emerald-800">
                      {isCommercial || isBuilding ? `${sqftVal.toLocaleString('en-IN')} sq.ft` : `${p.area} Acres`}
                    </p>
                  </div>
                  <div>
                    <p className="text-brand-muted uppercase tracking-wide" style={{ fontSize: '9px' }}>Converted Extent</p>
                    <p className="text-gov-text font-medium mt-0.5 text-slate-500">
                      {isCommercial || isBuilding ? `${p.area} Acres` : `${sqftVal.toLocaleString('en-IN')} sq.ft`}
                    </p>
                  </div>
                  <div>
                    <p className="text-brand-muted uppercase tracking-wide" style={{ fontSize: '9px' }}>Category</p>
                    <p className="text-gov-text font-medium mt-0.5">
                      {isCommercial ? 'Commercial Land' : isBuilding ? 'Building / Residential' : 'Farming Land'}
                    </p>
                  </div>
                  <div>
                    <p className="text-brand-muted uppercase tracking-wide" style={{ fontSize: '9px' }}>{t('land.state')}</p>
                    <p className="text-gov-text font-medium mt-0.5">{p.stateName}</p>
                  </div>
                </div>

              {/* Owner */}
              <div className="flex items-center gap-2 p-2 bg-brand-light rounded">
                <Info size={12} className="text-brand-navy flex-shrink-0" />
                <div>
                  <p className="text-[9px] text-brand-muted uppercase tracking-wide">{t('land.owner')}</p>
                  <p className="text-xs text-brand-navy font-semibold">{p.recordedOwner}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-3 flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/citizen/gis?parcel=${p.id}`); }}
                  className="gov-btn-primary flex items-center gap-1.5 text-xs"
                >
                  <Map size={14} />
                  {t('land.viewOnMap')}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/citizen/apply?parcel=${p.id}`); }}
                  className="gov-btn-secondary flex items-center gap-1.5 text-xs"
                >
                  Apply Service
                </button>
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
