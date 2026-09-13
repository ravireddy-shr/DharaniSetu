import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { DEMO_SERVICES } from '../../data/demoData';
import { toast } from '../../components/ui/Toast';
import { FileText, Clock, ShieldCheck, Plus, CheckCircle2, ArrowRight } from 'lucide-react';
import type { Service } from '../../types';

export function ServiceManagementPage() {
  const { t } = useTranslation();
  const [services, setServices] = useState<Service[]>(DEMO_SERVICES);

  return (
    <PageLayout role="admin">
      <DemoBanner />
      <PageHeader
        title={t('admin.serviceManagement')}
        subtitle="Manage government land governance public services, SLAs, and mandatory documents"
        breadcrumb={[{ label: 'Home' }, { label: t('nav.services') }]}
        action={
          <button
            onClick={() => toast('info', 'Demo Action', 'New service configuration dialog')}
            className="gov-btn-primary flex items-center gap-1.5 text-xs shadow-sm"
          >
            <Plus size={14} />
            <span>Configure New Service</span>
          </button>
        }
      />

      <PageContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map(svc => (
            <div
              key={svc.id}
              className="gov-card flex flex-col justify-between border-t-4 border-t-brand-navy"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-brand-muted font-bold">
                        {svc.id}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-blue-800">
                        {svc.department} Dept
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-brand-navy mt-1">
                      {svc.name}
                    </h3>
                    <p className="text-xs text-brand-saffron font-medium">{svc.nameHi}</p>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-700 font-semibold bg-gray-100 px-2.5 py-1 rounded">
                    <Clock size={12} className="text-brand-orange" />
                    <span>{svc.estimatedDays} Days SLA</span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                  {svc.description}
                </p>

                <div className="p-3 bg-gray-50 rounded border border-gray-100">
                  <span className="text-[10px] text-brand-muted uppercase font-bold tracking-wider block mb-1.5">
                    Mandatory Statutory Documents ({svc.requiredDocs.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {svc.requiredDocs.map(doc => (
                      <span
                        key={doc}
                        className="text-[11px] bg-white border border-gov-border px-2 py-0.5 rounded text-gray-700 flex items-center gap-1"
                      >
                        <CheckCircle2 size={10} className="text-emerald-600" />
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gov-border flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                  <ShieldCheck size={14} /> Active Citizen Service
                </span>

                <button
                  onClick={() => toast('info', 'Edit Service', `Editing parameters for ${svc.name}`)}
                  className="text-brand-navy hover:underline font-medium"
                >
                  Edit Settings
                </button>
              </div>
            </div>
          ))}
        </div>
      </PageContent>
    </PageLayout>
  );
}
