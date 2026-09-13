import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import {
  Network, Server, Database, Map, FileCheck, Shield,
  ArrowRight, RefreshCw, Activity, Cpu, CheckCircle2, AlertCircle
} from 'lucide-react';

interface NodeStatus {
  id: string;
  name: string;
  department: string;
  type: string;
  protocol: string;
  status: 'ONLINE' | 'ACTIVE' | 'DEGRADED';
  latency: number;
  uptime: string;
  throughput: string;
  description: string;
}

export function InteroperabilityPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'architecture' | 'protocols' | 'telemetry'>('architecture');
  const [pulse, setPulse] = useState(0);

  // Pulse simulation for packet movement
  useEffect(() => {
    const timer = setInterval(() => {
      setPulse(p => (p + 1) % 4);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const nodes: NodeStatus[] = [
    {
      id: 'gis',
      name: 'GIS Spatial Server',
      department: 'Survey & Settlement',
      type: 'GeoServer / PostGIS OGC',
      protocol: 'OGC WFS / WMS & GeoJSON',
      status: 'ONLINE',
      latency: 42,
      uptime: '99.98%',
      throughput: '1.4k req/min',
      description: 'Provides polygon cadastral boundaries, survey parcel centroids, and satellite layer overlays.'
    },
    {
      id: 'revenue',
      name: 'Bhoomi / Revenue System',
      department: 'Department of Revenue',
      type: 'ROR 1B / Mutation Ledger',
      protocol: 'SOAP / REST XML API',
      status: 'ONLINE',
      latency: 58,
      uptime: '99.95%',
      throughput: '3.2k req/min',
      description: 'Synchronizes pattadar passbooks, mutation status records, and encumbrance certificates.'
    },
    {
      id: 'registration',
      name: 'CARD Registration System',
      department: 'Registration & Stamps',
      type: 'Deed & Conveyance Registry',
      protocol: 'mTLS JSON Web Tokens',
      status: 'ONLINE',
      latency: 64,
      uptime: '99.91%',
      throughput: '890 req/min',
      description: 'Validates sale deeds, non-encumbrance status, stamp duties, and registered conveyances.'
    },
    {
      id: 'survey',
      name: 'ETS / DGPS Survey Gateway',
      department: 'Directorate of Land Records',
      type: 'Cadastral Boundary Engine',
      protocol: 'HTTPS REST GeoServices',
      status: 'ONLINE',
      latency: 49,
      uptime: '99.99%',
      throughput: '620 req/min',
      description: 'Ingests field inspection measurements, DGPS rover data, and sub-division demarcation coordinates.'
    }
  ];

  return (
    <PageLayout role={user?.role === 'admin' ? 'admin' : 'officer'}>
      <DemoBanner />
      <PageHeader
        title="DharaniSetu Interoperability Network Hub"
        subtitle="Federated Digital Public Infrastructure connecting state land registries, spatial GIS, and statutory portals"
        breadcrumb={[{ label: 'Home' }, { label: t('nav.interoperability') }]}
        action={
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              All 4 Nodes Connected
            </span>
          </div>
        }
      />

      <PageContent>
        {/* Prototype Transparency Notice */}
        <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle size={16} className="text-amber-700 mt-0.5 flex-shrink-0" />
          <p className="leading-relaxed">
            <strong>System Architecture Note:</strong> This interoperability hub demonstrates the unified data interchange layer between disparate departmental systems (GIS, Revenue, Registration, Survey). In this prototype, connections are simulated using standard OGC/REST interfaces.
          </p>
        </div>

        {/* Visual Architecture Diagram */}
        <div className="gov-card border-t-4 border-t-brand-navy">
          <h3 className="text-sm font-semibold text-brand-navy mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Network size={16} className="text-brand-navy" />
              Federated Interoperability Architecture
            </span>
            <span className="text-[11px] text-brand-muted font-normal">
              Packet exchange simulation active
            </span>
          </h3>

          <div className="bg-slate-900 rounded-xl p-6 text-white overflow-hidden relative shadow-inner">
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />

            {/* Central Hub */}
            <div className="relative z-10 flex flex-col items-center justify-center my-4">
              <div className="bg-gradient-to-r from-blue-700 via-brand-navy to-slate-800 p-4 rounded-xl border-2 border-brand-saffron shadow-2xl text-center max-w-sm w-full">
                <div className="w-10 h-10 rounded-full bg-white text-brand-navy flex items-center justify-center mx-auto mb-2 font-bold text-sm shadow">
                  DS
                </div>
                <h4 className="text-sm font-bold tracking-wide">DHARANI SETU</h4>
                <p className="text-[11px] text-brand-saffron font-semibold uppercase">National Interoperability Gateway</p>
                <p className="text-[10px] text-slate-300 mt-1">Single Source of Truth · Unified Land Workflow</p>
                <div className="mt-2 flex items-center justify-center gap-2 text-[10px] bg-black/40 py-1 px-2 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ISO 19152 LADM Compliant Hub</span>
                </div>
              </div>

              {/* Connecting lines / status */}
              <div className="w-0.5 h-6 bg-slate-600 my-1" />
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
                API GATEWAY & SECURE BUS
              </span>
            </div>

            {/* Satellite Department Nodes */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {nodes.map((node, i) => (
                <div
                  key={node.id}
                  className={`p-3.5 rounded-lg border transition-all duration-300 ${
                    pulse === i
                      ? 'bg-slate-800/90 border-brand-saffron shadow-lg ring-1 ring-brand-saffron'
                      : 'bg-slate-800/40 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-xs font-bold text-white truncate">{node.name}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                  </div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">{node.department}</p>
                  <div className="mt-2 pt-2 border-t border-slate-700/60 space-y-1 text-[11px]">
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Interface:</span>
                      <span className="font-mono text-[10px] truncate max-w-[120px]">{node.protocol}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Latency:</span>
                      <span className="text-emerald-400 font-mono">{node.latency} ms</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Uptime:</span>
                      <span className="font-mono">{node.uptime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Node Detail Table */}
        <div className="gov-card">
          <h3 className="text-sm font-semibold text-brand-navy mb-3">
            Connected Government Infrastructure Endpoints
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-brand-navy text-white">
                  <th className="py-2.5 px-3 font-semibold">Government System</th>
                  <th className="py-2.5 px-3 font-semibold">Department</th>
                  <th className="py-2.5 px-3 font-semibold">Integration Standard</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                  <th className="py-2.5 px-3 font-semibold">Throughput</th>
                  <th className="py-2.5 px-3 font-semibold">Functional Capability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gov-border">
                {nodes.map(n => (
                  <tr key={n.id} className="hover:bg-brand-light/40">
                    <td className="py-2.5 px-3 font-semibold text-brand-navy whitespace-nowrap">
                      {n.name}
                    </td>
                    <td className="py-2.5 px-3 text-gray-600 whitespace-nowrap">{n.department}</td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-gray-700 whitespace-nowrap">
                      {n.protocol}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {n.status} ({n.latency}ms)
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-700 whitespace-nowrap">{n.throughput}</td>
                    <td className="py-2.5 px-3 text-gray-600 text-[11px]">{n.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Standards & Security Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="gov-card space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Shield size={18} />
            </div>
            <h4 className="text-xs font-bold text-brand-navy">National Security Standards</h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              All inter-system communication utilizes mTLS v1.3 with AES-256-GCM cipher suites and role-based zero-trust identity assertions.
            </p>
          </div>

          <div className="gov-card space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Map size={18} />
            </div>
            <h4 className="text-xs font-bold text-brand-navy">Cadastral & Spatial Alignment</h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Seamless spatial transformation between WGS84 (EPSG:4326) and local UTM projections ensures survey parcel boundaries correlate with deed descriptions.
            </p>
          </div>

          <div className="gov-card space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <RefreshCw size={18} />
            </div>
            <h4 className="text-xs font-bold text-brand-navy">Automated State Synchronization</h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Whenever an officer approves an application in DharaniSetu, event webhooks update the state revenue land record and mutate the cadastral database atomically.
            </p>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}
