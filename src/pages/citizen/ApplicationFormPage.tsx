import { useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import {
  FileText, RefreshCw, Layers, Building, Compass,
  AlertTriangle, Edit3, FileSearch, ArrowRight, Shield
} from 'lucide-react';

export function ApplicationFormPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const serviceParam = params.get('service')?.toLowerCase() || '';

  // Redirect legacy ?service= queries directly to the dedicated service application portal
  useEffect(() => {
    if (serviceParam.includes('reg') || serviceParam === 'svc-001') {
      navigate('/citizen/apply/registration', { replace: true });
    } else if (serviceParam.includes('mut') || serviceParam === 'svc-002') {
      navigate('/citizen/apply/mutation', { replace: true });
    } else if (serviceParam.includes('conv') || serviceParam === 'svc-003') {
      navigate('/citizen/apply/conversion', { replace: true });
    } else if (serviceParam.includes('build') || serviceParam === 'svc-004') {
      navigate('/citizen/apply/building', { replace: true });
    } else if (serviceParam.includes('surv') || serviceParam === 'svc-005') {
      navigate('/citizen/apply/survey', { replace: true });
    } else if (serviceParam.includes('griev') || serviceParam === 'svc-006' || serviceParam === 'svc-008') {
      navigate('/citizen/apply/grievance', { replace: true });
    } else if (serviceParam.includes('corr') || serviceParam === 'svc-007') {
      navigate('/citizen/apply/correction', { replace: true });
    } else if (serviceParam.includes('cert')) {
      navigate('/citizen/apply/certificates', { replace: true });
    }
  }, [serviceParam, navigate]);

  const portals = [
    {
      title: t('services.items.regTitle', 'Land Registration'),
      desc: t('services.items.regSub', 'Execute sale deeds, gift deeds, partition deeds & stamp duty assessment'),
      path: '/citizen/apply/registration',
      category: t('services.categories.registration', 'Registration Dept'),
      icon: <FileText size={24} className="text-emerald-700" />,
      bg: 'bg-emerald-50/60 border-emerald-200/80 hover:border-emerald-400',
      sla: '15 Days SLA',
    },
    {
      title: t('services.items.mutTitle', 'Mutation / Ownership Update'),
      desc: t('services.items.mutSub', 'Update statutory Record of Rights (RoR 1B) after sale, partition or inheritance'),
      path: '/citizen/apply/mutation',
      category: t('services.categories.revenue', 'Revenue Dept'),
      icon: <RefreshCw size={24} className="text-orange-700" />,
      bg: 'bg-orange-50/60 border-orange-200/80 hover:border-orange-400',
      sla: '15 Days SLA',
    },
    {
      title: t('home.servicesList.SVC-002.title', 'Land Use Conversion (NALA)'),
      desc: t('home.servicesList.SVC-002.subtitle', 'Convert agricultural land to residential, commercial or industrial use'),
      path: '/citizen/apply/conversion',
      category: t('home.servicesList.SVC-002.category', 'Revenue Dept'),
      icon: <Layers size={24} className="text-teal-700" />,
      bg: 'bg-teal-50/60 border-teal-200/80 hover:border-teal-400',
      sla: '21 Days SLA',
    },
    {
      title: t('home.servicesList.SVC-001.title', 'Building Permission & Layout NOC'),
      desc: t('home.servicesList.SVC-001.subtitle', 'Statutory structural & revenue clearance for architectural construction'),
      path: '/citizen/apply/building',
      category: t('home.servicesList.SVC-001.category', 'Town Planning'),
      icon: <Building size={24} className="text-blue-700" />,
      bg: 'bg-blue-50/60 border-blue-200/80 hover:border-blue-400',
      sla: '25 Days SLA',
    },
    {
      title: t('home.servicesList.SVC-004.title', 'Cadastral Survey & Demarcation'),
      desc: t('home.servicesList.SVC-004.subtitle', 'Physical boundary marking with DGPS rovers & FMB sketch digitization'),
      path: '/citizen/apply/survey',
      category: t('home.servicesList.SVC-004.category', 'Survey Dept'),
      icon: <Compass size={24} className="text-purple-700" />,
      bg: 'bg-purple-50/60 border-purple-200/80 hover:border-purple-400',
      sla: '14 Days SLA',
    },
    {
      title: t('home.servicesList.SVC-005.title', 'Land Record & Passbook Correction'),
      desc: t('home.servicesList.SVC-005.subtitle', 'Rectify typographical, spelling, survey number, or extent discrepancies'),
      path: '/citizen/apply/correction',
      category: t('home.servicesList.SVC-005.category', 'Revenue Dept'),
      icon: <Edit3 size={24} className="text-amber-700" />,
      bg: 'bg-amber-50/60 border-amber-200/80 hover:border-amber-400',
      sla: '15 Days SLA',
    },
    {
      title: t('home.servicesList.SVC-006.title', 'Certificates (RoR 1B / EC / Title)'),
      desc: t('home.servicesList.SVC-006.subtitle', 'Download digitally signed official Record of Rights and non-encumbrance reports'),
      path: '/citizen/apply/certificates',
      category: t('home.servicesList.SVC-006.category', 'Revenue Dept'),
      icon: <FileSearch size={24} className="text-cyan-700" />,
      bg: 'bg-cyan-50/60 border-cyan-200/80 hover:border-cyan-400',
      sla: '3 Days SLA',
    },
    {
      title: t('home.servicesList.SVC-008.title', 'Land Grievance & Dispute Redressal'),
      desc: t('home.servicesList.SVC-008.subtitle', 'Report encroachment, unauthorized record changes, or service delays'),
      path: '/citizen/apply/grievance',
      category: t('home.servicesList.SVC-008.category', 'Collectorate'),
      icon: <AlertTriangle size={24} className="text-rose-700" />,
      bg: 'bg-rose-50/60 border-rose-200/80 hover:border-rose-400',
      sla: '30 Days SLA',
    },
  ];

  return (
    <PageLayout role="citizen">
      <DemoBanner />
      <PageHeader
        title={t('services.title', 'Dedicated Service Application Portals')}
        subtitle={t('services.selectService', 'Select a statutory land service below to open its dedicated application form')}
        breadcrumb={[
          { label: t('nav.home', 'Home'), path: '/citizen/dashboard' },
          { label: t('nav.services', 'Services'), path: '/citizen/services' },
          { label: t('nav.applyService', 'Apply Portal') },
        ]}
      />

      <PageContent>
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-emerald-600" />
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                {t('common.statutoryAppDesc', 'Each service features a dedicated legal intake form with tailored document requirements and auto-routing to your local Tahsildar.')}
              </p>
            </div>
            <Link
              to="/citizen/services"
              className="text-xs font-bold text-emerald-700 hover:underline flex-shrink-0"
            >
              {t('nav.services', 'View Service Catalog')} →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portals.map(p => (
              <Link
                key={p.path}
                to={p.path}
                className={`p-6 rounded-3xl border-2 bg-white transition-all hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between group ${p.bg}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 rounded-2xl bg-white shadow-xs border border-slate-100">
                      {p.icon}
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-white/80 px-2.5 py-1 rounded-full border border-slate-200">
                      {p.sla}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {p.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/50 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                  <span>{t('services.apply', 'Open Dedicated Application Form')}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}
