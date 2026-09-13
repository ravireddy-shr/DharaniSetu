import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { Header } from '../../components/layout/Header';
import { GISExplorer } from '../../components/gis/GISExplorer';
import {
  Search, ArrowRight, Building2, RefreshCw, MapPin,
  ShieldAlert, FileText, Award, Compass, HelpCircle,
  BookOpen, Headphones, Download, CheckCircle2, ChevronRight
} from 'lucide-react';

export function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  const [heroSearch, setHeroSearch] = useState('');
  const [trackToken, setTrackToken] = useState('DS-AP-2026-000124');
  const [serviceSearch, setServiceSearch] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/citizen/gis?parcel=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      const gisEl = document.getElementById('gis-section');
      gisEl?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackToken.trim()) {
      navigate(`/citizen/track?token=${encodeURIComponent(trackToken.trim())}`);
    } else {
      navigate('/citizen/track');
    }
  };

  const handleServiceClick = (serviceType: string) => {
    if (isAuthenticated && user?.role === 'citizen') {
      navigate(`/citizen/apply?service=${serviceType}`);
    } else {
      navigate('/login');
    }
  };

  const allServices = [
    {
      id: 'SVC-001',
      title: t('home.servicesList.SVC-001.title', 'Building Permission'),
      subtitle: t('home.servicesList.SVC-001.subtitle', 'Residential & commercial construction sanctions'),
      category: t('home.servicesList.SVC-001.category', 'Urban / Panchayat'),
      icon: <Building2 size={24} className="text-blue-600" />,
      bg: 'bg-blue-50/70',
      border: 'border-blue-100 hover:border-blue-300',
      arrowBg: 'bg-blue-100 group-hover:bg-blue-600 group-hover:text-white text-blue-700',
    },
    {
      id: 'SVC-002',
      title: t('home.servicesList.SVC-002.title', 'Land Conversion'),
      subtitle: t('home.servicesList.SVC-002.subtitle', 'Agricultural → Non-Agricultural conversion'),
      category: t('home.servicesList.SVC-002.category', 'Revenue'),
      icon: <RefreshCw size={24} className="text-emerald-600" />,
      bg: 'bg-emerald-50/70',
      border: 'border-emerald-100 hover:border-emerald-300',
      arrowBg: 'bg-emerald-100 group-hover:bg-emerald-600 group-hover:text-white text-emerald-700',
    },
    {
      id: 'SVC-003',
      title: t('home.servicesList.SVC-003.title', 'Mutation / Ownership Update'),
      subtitle: t('home.servicesList.SVC-003.subtitle', 'Title transfer after sale, partition or inheritance'),
      category: t('home.servicesList.SVC-003.category', 'Revenue'),
      icon: <FileText size={24} className="text-orange-600" />,
      bg: 'bg-orange-50/70',
      border: 'border-orange-100 hover:border-orange-300',
      arrowBg: 'bg-orange-100 group-hover:bg-orange-600 group-hover:text-white text-orange-700',
    },
    {
      id: 'SVC-004',
      title: t('home.servicesList.SVC-004.title', 'Survey & Demarcation'),
      subtitle: t('home.servicesList.SVC-004.subtitle', 'Physical boundary marking with DGPS rovers'),
      category: t('home.servicesList.SVC-004.category', 'Survey'),
      icon: <Compass size={24} className="text-purple-600" />,
      bg: 'bg-purple-50/70',
      border: 'border-purple-100 hover:border-purple-300',
      arrowBg: 'bg-purple-100 group-hover:bg-purple-600 group-hover:text-white text-purple-700',
    },
    {
      id: 'SVC-005',
      title: t('home.servicesList.SVC-005.title', 'Land Record Correction'),
      subtitle: t('home.servicesList.SVC-005.subtitle', 'Rectify typographical or survey number errors'),
      category: t('home.servicesList.SVC-005.category', 'Revenue'),
      icon: <FileText size={24} className="text-amber-600" />,
      bg: 'bg-amber-50/70',
      border: 'border-amber-100 hover:border-amber-300',
      arrowBg: 'bg-amber-100 group-hover:bg-amber-600 group-hover:text-white text-amber-700',
    },
    {
      id: 'SVC-006',
      title: t('home.servicesList.SVC-006.title', 'Certificates'),
      subtitle: t('home.servicesList.SVC-006.subtitle', 'Certified ROR 1B, Nativity, Encumbrance certificate'),
      category: t('home.servicesList.SVC-006.category', 'Revenue'),
      icon: <Award size={24} className="text-cyan-600" />,
      bg: 'bg-cyan-50/70',
      border: 'border-cyan-100 hover:border-cyan-300',
      arrowBg: 'bg-cyan-100 group-hover:bg-cyan-600 group-hover:text-white text-cyan-700',
    },
    {
      id: 'SVC-007',
      title: t('home.servicesList.SVC-007.title', 'Layout Approval'),
      subtitle: t('home.servicesList.SVC-007.subtitle', 'Master plan compliance & plotting sanctions'),
      category: t('home.servicesList.SVC-007.category', 'Town Planning'),
      icon: <MapPin size={24} className="text-teal-600" />,
      bg: 'bg-teal-50/70',
      border: 'border-teal-100 hover:border-teal-300',
      arrowBg: 'bg-teal-100 group-hover:bg-teal-600 group-hover:text-white text-teal-700',
    },
    {
      id: 'SVC-008',
      title: t('home.servicesList.SVC-008.title', 'Grievances & Disputes'),
      subtitle: t('home.servicesList.SVC-008.subtitle', 'Statutory boundary disputes & officer inquiries'),
      category: t('home.servicesList.SVC-008.category', 'Legal / Revenue'),
      icon: <ShieldAlert size={24} className="text-rose-600" />,
      bg: 'bg-rose-50/70',
      border: 'border-rose-100 hover:border-rose-300',
      arrowBg: 'bg-rose-100 group-hover:bg-rose-600 group-hover:text-white text-rose-700',
    },
  ];

  const filteredServices = allServices.filter(s =>
    s.title.toLowerCase().includes(serviceSearch.toLowerCase()) ||
    s.subtitle.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800">
      <Header />

      {/* Hero Section matching Top-Left panel of reference */}
      <section className="relative bg-gradient-to-b from-[#1D0A69] via-[#160854] to-[#115E59] text-white pt-12 sm:pt-16 pb-20 sm:pb-24 overflow-hidden">
        {/* Landscape photo backdrop with green fields and mountains */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop')`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Bold Typography & Search Pill */}
            <div className="lg:col-span-8 text-left">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white">
                {t('home.heroTitle1', 'Your Land.')}<br />
                {t('home.heroTitle2', 'All Services.')}<br />
                <span className="text-[#D97706]">{t('home.heroTitle3', 'In One Place.')}</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-200 font-normal mt-3 tracking-wide">
                {t('home.heroSubtitle', 'Transparent • Integrated • Citizen Friendly')}
              </p>

              {/* Large Search Pill Bar */}
              <form
                onSubmit={handleHeroSearch}
                className="mt-6 sm:mt-8 max-w-2xl bg-white rounded-full p-2 shadow-2xl flex items-center gap-2 border-2 border-white/90"
              >
                <div className="pl-4 text-slate-400">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  value={heroSearch}
                  onChange={e => setHeroSearch(e.target.value)}
                  placeholder={t('home.heroSearchPlaceholder', 'Search by Survey No. / Patta No. / Address')}
                  className="w-full bg-transparent text-[#0F172A] placeholder:text-slate-400 text-base font-medium focus:outline-none px-2"
                />
                <button
                  type="submit"
                  className="w-11 h-11 rounded-full bg-[#115E59] hover:bg-[#0D4845] text-white flex items-center justify-center flex-shrink-0 transition-transform active:scale-95 shadow-md"
                >
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>

            {/* Right Column: "People Land Progress" State Outline Badge */}
            <div className="lg:col-span-4 hidden lg:flex justify-end">
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl max-w-xs text-center transform rotate-1 hover:rotate-0 transition-transform">
                <div className="w-16 h-16 rounded-full bg-[#D97706]/20 border-2 border-[#D97706] flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-2xl font-bold text-white italic tracking-wide">
                  {t('home.peopleLandProgress', 'People Land Progress')}
                </h3>
                <p className="text-xs text-slate-200 mt-2 font-medium">
                  {t('home.dpiSubtitle', 'Digital Public Infrastructure for Real-Time Cadastral Governance')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating 6-Item Quick Action Dock at bottom of hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20 mt-10 sm:mt-14">
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-200 grid grid-cols-3 sm:grid-cols-6 gap-3 text-center">
            {[
              { label: t('home.build', 'Build'), icon: <Building2 size={22} className="text-[#1D0A69]" />, link: '/citizen/services' },
              { label: t('home.convertLandUse', 'Convert Land Use'), icon: <RefreshCw size={22} className="text-[#115E59]" />, link: '/citizen/services' },
              { label: t('home.transferMutation', 'Transfer (Mutation)'), icon: <FileText size={22} className="text-[#D97706]" />, link: '/citizen/services' },
              { label: t('home.surveyBoundary', 'Survey & Boundary'), icon: <MapPin size={22} className="text-[#DC2626]" />, link: '/citizen/services' },
              { label: t('home.getCertificates', 'Get Certificates'), icon: <Award size={22} className="text-[#115E59]" />, link: '/citizen/services' },
              { label: t('home.raiseGrievance', 'Raise Grievance'), icon: <ShieldAlert size={22} className="text-[#EA580C]" />, link: '/citizen/services' },
            ].map(act => (
              <button
                key={act.label}
                onClick={() => handleServiceClick(act.label)}
                className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-slate-50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-white group-hover:shadow-md flex items-center justify-center transition-all">
                  {act.icon}
                </div>
                <span className="text-sm font-semibold text-[#0F172A] mt-2 group-hover:text-[#115E59]">
                  {act.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid Section matching Top-Right panel of reference */}
      <section id="services-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-[24px] font-semibold text-[#0F172A]">
              {t('home.landServices', 'Land Services')}
            </h2>
            <p className="text-base text-slate-600 font-normal mt-1">
              {t('home.landServicesSub', 'Apply online. Track easily. No more multiple visits.')}
            </p>
          </div>

          {/* Search box on right */}
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={serviceSearch}
              onChange={e => setServiceSearch(e.target.value)}
              placeholder={t('home.searchServicePlaceholder', 'Search a service...')}
              className="w-full bg-white border-[1.5px] border-[#94A3B8] rounded-xl pl-9 pr-4 py-2 text-base font-normal text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#115E59]/25 focus:border-[#115E59] shadow-xs"
            />
          </div>
        </div>

        {/* 8 Pastel Colored Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredServices.map(svc => (
            <div
              key={svc.id}
              onClick={() => handleServiceClick(svc.id)}
              className={`${svc.bg} border ${svc.border} rounded-2xl p-5 shadow-sm hover:shadow-hover transition-all cursor-pointer flex flex-col justify-between group min-h-[160px]`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3">
                  {svc.icon}
                </div>
                <h3 className="text-[18px] font-semibold text-[#0F172A] group-hover:text-[#115E59] transition-colors">
                  {svc.title}
                </h3>
                <p className="text-sm text-slate-600 mt-1 font-normal leading-relaxed">
                  {svc.subtitle}
                </p>
              </div>

              <div className="mt-4 flex justify-end">
                <div className={`w-8 h-8 rounded-full ${svc.arrowBg} flex items-center justify-center shadow-sm transition-transform group-hover:translate-x-1`}>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GIS Cadastral Map Section matching Middle-Left panel of reference */}
      <section id="gis-section" className="bg-[#F8FAFC] border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#115E59] block mb-1">
                {t('home.spatialVerification', 'Real-time Spatial Verification')}
              </span>
              <h2 className="text-[24px] sm:text-[28px] font-semibold text-[#0F172A]">
                {t('home.cadastralGis', 'Land Information & Cadastral GIS')}
              </h2>
              <p className="text-base text-slate-600 font-normal mt-1">
                {t('home.cadastralGisSub', 'Search survey numbers, inspect parcel boundaries on high-resolution satellite imagery, and verify registered title records.')}
              </p>
            </div>

            <Link
              to={isAuthenticated && user?.role === 'citizen' ? '/citizen/gis' : '/login'}
              className="gov-btn-primary text-base flex items-center gap-2 self-start sm:self-auto"
            >
              <span>{t('home.launchGis', 'Launch Full GIS Explorer')}</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Embedded Satellite Map with Side Land Info Panel */}
          <div className="rounded-2xl shadow-xl overflow-hidden border border-slate-300 relative isolate z-0">
            <GISExplorer height="560px" showSearch={true} showLayerToggle={true} />
          </div>
        </div>
      </section>

      {/* Track & Real-Time Updates matching Bottom-Left of reference */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Track Box */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-[24px] font-semibold text-[#0F172A] mb-1">
              {t('home.trackApplication', 'Track Your Application')}
            </h2>
            <p className="text-base text-slate-600 font-normal mb-4">
              {t('home.trackApplicationSub', 'Enter your statutory token to see current review stage, assigned officer, and estimated completion date.')}
            </p>

            <form onSubmit={handleTrackSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={trackToken}
                  onChange={e => setTrackToken(e.target.value)}
                  placeholder={t('home.enterAppNumber', 'Enter Application Number (e.g. DS-AP-2026-000124)')}
                  className="w-full bg-white border-[1.5px] border-[#94A3B8] rounded-xl pl-9 pr-4 py-2.5 text-base font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#115E59]/25 focus:border-[#115E59] font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#115E59] hover:bg-[#0D4845] text-white rounded-xl font-semibold text-base flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Search size={16} />
                <span className="hidden sm:inline">{t('home.track', 'Track')}</span>
              </button>
            </form>

            {/* Application Card Preview matching reference */}
            <div className="mt-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="font-mono text-sm font-bold text-slate-900">BP-2026-00124</p>
                  <p className="text-xs text-slate-500 font-medium">{t('home.servicesList.SVC-001.title', 'Building Permission')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#FFF7ED] text-[#EA580C] text-xs font-bold border border-[#FFEDD5]">
                  {t('home.inProgress', 'In Progress')}
                </span>
                <ChevronRight size={18} className="text-slate-400" />
              </div>
            </div>
          </div>

          {/* Real-time alerts card */}
          <div className="lg:col-span-5 bg-[#F3F0FC] p-6 sm:p-7 rounded-2xl border border-[#DDD6FE] flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1D0A69] text-white flex items-center justify-center shadow-md mb-3">
                <span className="text-2xl">🔔</span>
              </div>
              <h3 className="text-[20px] font-semibold text-[#1D0A69]">
                {t('home.realtimeUpdates', 'Get real-time updates')}
              </h3>
              <p className="text-base text-slate-700 mt-1 font-normal leading-relaxed">
                {t('home.realtimeUpdatesSub', 'We will notify you on every statutory status change, document verification, and officer directive via SMS & Email.')}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DDD6FE] flex items-center justify-between text-sm font-bold text-[#1D0A69]">
              <span>{t('home.dispatchAlerts', 'Automated Dispatch Alerts')}</span>
              <span className="text-[#16A34A] font-semibold flex items-center gap-1">
                <CheckCircle2 size={16} /> {t('home.active', 'Active')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions & Need Help matching Bottom-Right of reference */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-[20px] font-semibold text-[#0F172A] mb-4">{t('home.quickActions', 'Quick Actions')}</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: t('nav.trackApplication', 'Track Application'), icon: <Search size={18} className="text-[#1D0A69]" />, path: '/citizen/track' },
                { label: t('home.viewMap', 'View Map'), icon: <Compass size={18} className="text-[#115E59]" />, path: '/citizen/gis' },
                { label: t('home.downloadCertificate', 'Download Certificate'), icon: <Download size={18} className="text-[#D97706]" />, path: '/citizen/documents' },
                { label: t('home.raiseGrievance', 'Raise Grievance'), icon: <ShieldAlert size={18} className="text-[#EA580C]" />, path: '/citizen/services' },
              ].map(q => (
                <Link
                  key={q.path + q.label}
                  to={q.path}
                  className="p-3 bg-slate-50 hover:bg-[#F0FDFA] rounded-xl border border-slate-200 hover:border-[#99F6E4] transition-all text-center flex flex-col items-center justify-center gap-1.5 group"
                >
                  <div className="p-2 rounded-lg bg-white shadow-xs group-hover:scale-110 transition-transform">
                    {q.icon}
                  </div>
                  <span className="text-sm font-semibold text-[#0F172A] group-hover:text-[#115E59]">
                    {q.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Need Help Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-[20px] font-semibold text-[#0F172A] mb-4">{t('home.needHelp', 'Need Help?')}</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: t('home.faqs', 'FAQs'), icon: <HelpCircle size={20} className="text-[#D97706]" />, bg: 'bg-amber-50', border: 'border-amber-200', link: '/contact' },
                { label: t('home.guidelines', 'Guidelines'), icon: <BookOpen size={20} className="text-[#1D0A69]" />, bg: 'bg-blue-50', border: 'border-blue-200', link: '/contact' },
                { label: t('home.contactUs', 'Contact Us'), icon: <Headphones size={20} className="text-[#115E59]" />, bg: 'bg-emerald-50', border: 'border-emerald-200', link: '/contact' },
              ].map(h => (
                <Link
                  key={h.label}
                  to={h.link}
                  className={`p-3 rounded-xl ${h.bg} border ${h.border} text-center flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-sm transition-all`}
                >
                  <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center">
                    {h.icon}
                  </div>
                  <span className="text-sm font-semibold text-[#0F172A]">{h.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Promo Card: Field banner */}
          <div
            className="rounded-2xl p-6 relative overflow-hidden shadow-sm flex flex-col justify-end min-h-[180px] bg-cover bg-center border border-slate-200 text-white"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.3) 60%, transparent 100%), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop')`,
            }}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
              Transparent Land Governance
            </span>
            <h4 className="text-lg font-bold text-white mt-0.5">
              for a Better Tomorrow
            </h4>
            <p className="text-xs text-slate-200 mt-1 font-medium">
              Real-time cadastral transparency empowering citizens across India.
            </p>
          </div>
        </div>
      </section>

      {/* Official Government Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 text-sm mt-auto border-t-4 border-[#115E59]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/logo.png"
                alt="DharaniSetu"
                className="w-8 h-8 rounded-full bg-white object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <span className="font-extrabold text-white text-base">DharaniSetu</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-normal">
              Integrated GIS-enabled Digital Public Infrastructure for Land Governance and Government System Interoperability.
            </p>
          </div>

          <div>
            <p className="text-white font-bold text-base mb-3">Citizen Services</p>
            <ul className="space-y-2 text-sm font-normal">
              <li><Link to="/citizen/gis" className="hover:text-[#5EEAD4] transition-colors">Cadastral Satellite Explorer</Link></li>
              <li><Link to="/citizen/my-land" className="hover:text-[#5EEAD4] transition-colors">Record of Rights (ROR 1B)</Link></li>
              <li><Link to="/citizen/apply" className="hover:text-[#5EEAD4] transition-colors">Land Registration & Mutation</Link></li>
              <li><Link to="/citizen/track" className="hover:text-[#5EEAD4] transition-colors">Public Token Tracking</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-bold text-base mb-3">Interoperable Networks</p>
            <ul className="space-y-2 text-sm font-normal">
              <li><span>Department of Revenue (Bhoomi)</span></li>
              <li><span>Registration & Stamps (CARD)</span></li>
              <li><span>Survey & Settlement Directorate</span></li>
              <li><span>National Spatial Data Infrastructure</span></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-bold text-base mb-3">Contact & Support</p>
            <p className="text-sm text-slate-400 leading-relaxed font-normal">
              National Land Governance Citizen Helpline:
            </p>
            <p className="text-base font-bold text-[#5EEAD4] mt-1 font-mono">1800-111-555 (Toll Free)</p>
            <p className="text-sm text-slate-400 mt-0.5">helpdesk@dharanisetu.gov.in</p>
            <p className="text-xs text-[#D97706] font-bold mt-3">
              सत्यमेव जयते — People | Land | Prosperity
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-medium text-slate-500">
          <p>© 2026 DharaniSetu — Government of India. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <Link to="/login" className="hover:text-slate-300">Portal Login</Link>
            <span>&bull;</span>
            <Link to="/citizen/track" className="hover:text-slate-300">Application Tracking</Link>
            <span>&bull;</span>
            <span>Version 1.0 DPI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
