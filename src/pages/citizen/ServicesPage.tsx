import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { DEMO_SERVICES } from '../../data/demoData';
import {
  FileText, RefreshCw, Compass, ShieldAlert,
  Search, ArrowRight, Building2, Award, Clock
} from 'lucide-react';

export function ServicesPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const services = [
    {
      id: 'SVC-001',
      path: '/citizen/apply/registration',
      title: t('services.items.regTitle', 'Land Registration'),
      subtitle: t('services.items.regSub', 'Execution of sale deeds, title deeds & stamp duty'),
      category: 'Registration',
      icon: <FileText size={24} className="text-emerald-600" />,
      bg: 'bg-emerald-50/70',
      border: 'border-emerald-100 hover:border-emerald-300',
      arrowBg: 'bg-emerald-100 group-hover:bg-emerald-600 group-hover:text-white text-emerald-700',
      days: 15,
      docs: ['Sale Deed Draft', 'Identity Proof (Aadhaar)', 'Encumbrance Certificate'],
    },
    {
      id: 'SVC-002',
      path: '/citizen/apply/mutation',
      title: t('services.items.mutTitle', 'Mutation / Ownership Update'),
      subtitle: t('services.items.mutSub', 'Title transfer after sale, partition or inheritance'),
      category: 'Revenue',
      icon: <RefreshCw size={24} className="text-orange-600" />,
      bg: 'bg-orange-50/70',
      border: 'border-orange-100 hover:border-orange-300',
      arrowBg: 'bg-orange-100 group-hover:bg-orange-600 group-hover:text-white text-orange-700',
      days: 15,
      docs: ['Registered Sale Deed / Will', 'Previous Passbook', 'Identity Proof'],
    },
    {
      id: 'SVC-003',
      path: '/citizen/apply/conversion',
      title: t('services.items.convTitle', 'Land Conversion (NALA)'),
      subtitle: t('services.items.convSub', 'Agricultural → Non-Agricultural conversion'),
      category: 'Revenue',
      icon: <RefreshCw size={24} className="text-emerald-600" />,
      bg: 'bg-emerald-50/70',
      border: 'border-emerald-100 hover:border-emerald-300',
      arrowBg: 'bg-emerald-100 group-hover:bg-emerald-600 group-hover:text-white text-emerald-700',
      days: 21,
      docs: ['Pattadar Passbook', 'Chitta / Adangal', 'NOC from Local Body'],
    },
    {
      id: 'SVC-004',
      path: '/citizen/apply/building',
      title: t('services.items.buildTitle', 'Building Permission'),
      subtitle: t('services.items.buildSub', 'Residential & commercial construction sanctions'),
      category: 'Town Planning',
      icon: <Building2 size={24} className="text-blue-600" />,
      bg: 'bg-blue-50/70',
      border: 'border-blue-100 hover:border-blue-300',
      arrowBg: 'bg-blue-100 group-hover:bg-blue-600 group-hover:text-white text-blue-700',
      days: 25,
      docs: ['Site Plan', 'Title Deed', 'Structural Safety Certificate'],
    },
    {
      id: 'SVC-005',
      path: '/citizen/apply/survey',
      title: t('services.items.survTitle', 'Survey & Demarcation'),
      subtitle: t('services.items.survSub', 'Physical boundary marking with DGPS rovers'),
      category: 'Survey',
      icon: <Compass size={24} className="text-purple-600" />,
      bg: 'bg-purple-50/70',
      border: 'border-purple-100 hover:border-purple-300',
      arrowBg: 'bg-purple-100 group-hover:bg-purple-600 group-hover:text-white text-purple-700',
      days: 14,
      docs: ['FMB Sketch', 'Identity Proof', 'Adjoining Landowner NOC'],
    },
    {
      id: 'SVC-006',
      path: '/citizen/apply/correction',
      title: t('services.items.corrTitle', 'Land Record Correction'),
      subtitle: t('services.items.corrSub', 'Rectify typographical or survey number errors'),
      category: 'Revenue',
      icon: <FileText size={24} className="text-amber-600" />,
      bg: 'bg-amber-50/70',
      border: 'border-amber-100 hover:border-amber-300',
      arrowBg: 'bg-amber-100 group-hover:bg-amber-600 group-hover:text-white text-amber-700',
      days: 15,
      docs: ['Certified Old Records', 'Sub-Collector Order', 'Identity Proof'],
    },
    {
      id: 'SVC-007',
      path: '/citizen/apply/certificates',
      title: t('services.items.certTitle', 'Certificates (ROR 1B / EC)'),
      subtitle: t('services.items.certSub', 'Certified Record of Rights, Nativity & Encumbrance'),
      category: 'Revenue',
      icon: <Award size={24} className="text-cyan-600" />,
      bg: 'bg-cyan-50/70',
      border: 'border-cyan-100 hover:border-cyan-300',
      arrowBg: 'bg-cyan-100 group-hover:bg-cyan-600 group-hover:text-white text-cyan-700',
      days: 3,
      docs: ['Identity Proof', 'Survey Number Details'],
    },
    {
      id: 'SVC-008',
      path: '/citizen/apply/grievance',
      title: t('services.items.grievTitle', 'Land Grievance & Dispute'),
      subtitle: t('services.items.grievSub', 'Encroachment reporting & dispute petitions'),
      category: 'Legal / Revenue',
      icon: <ShieldAlert size={24} className="text-rose-600" />,
      bg: 'bg-rose-50/70',
      border: 'border-rose-100 hover:border-rose-300',
      arrowBg: 'bg-rose-100 group-hover:bg-rose-600 group-hover:text-white text-rose-700',
      days: 30,
      docs: ['Grievance Petition', 'Supporting Evidence', 'Photographs'],
    },
  ];

  const filtered = services.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase()) ||
    s.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageLayout role="citizen">
      <DemoBanner />
      <PageHeader
        title={t('services.title', 'Statutory Services')}
        subtitle="Apply directly through dedicated statutory portals with legally bound SLA tracking"
        breadcrumb={[{ label: t('nav.home', 'Home'), path: '/citizen/dashboard' }, { label: t('nav.services') }]}
      />

      <PageContent>
        {/* Search bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              {t('services.catalogTitle', 'Statutory Services Catalog')}
            </h2>
            <p className="text-xs text-slate-500">
              {t('services.catalogSubtitle', 'Select a specialized application portal to begin submission')}
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('services.searchPlaceholder', 'Search by service or department...')}
              className="gov-input pl-9 text-xs"
            />
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
          </div>
        </div>

        {/* 8 Pastel Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
          {filtered.map(svc => (
            <div
              key={svc.id}
              onClick={() => navigate(svc.path)}
              className={`${svc.bg} border ${svc.border} rounded-2xl p-5 shadow-sm hover:shadow-hover transition-all cursor-pointer flex flex-col justify-between group min-h-[180px]`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    {svc.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white/70 px-2 py-0.5 rounded-md">
                    {svc.days} {t('services.daysSla', 'Days SLA')}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                  {svc.subtitle}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-200/50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {t('services.keyDocuments', 'Key Documents')}
                  </span>
                  <p className="text-[11px] text-slate-600 truncate">
                    {svc.docs.join(', ')}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <div className={`w-8 h-8 rounded-full ${svc.arrowBg} flex items-center justify-center shadow-sm transition-transform group-hover:translate-x-1`}>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageContent>
    </PageLayout>
  );
}
