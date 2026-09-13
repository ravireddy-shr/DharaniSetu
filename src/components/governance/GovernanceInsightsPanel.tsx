import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { DEMO_PARCELS } from '../../data/demoData';
import {
  AlertTriangle, ShieldAlert, FileWarning, Scale,
  Sparkles, CheckCircle2, ArrowRight
} from 'lucide-react';
import { cn } from '../../utils';

interface GovernanceInsightsPanelProps {
  role: 'officer' | 'admin';
  officerMandal?: string;
  officerDistrict?: string;
  officerState?: string;
}

export function GovernanceInsightsPanel({
  role,
  officerMandal,
  officerState,
}: GovernanceInsightsPanelProps) {
  const { applications } = useAppStore();

  const insights = useMemo(() => {
    // 1. In-scope parcels
    const parcelsInScope = role === 'officer' && officerMandal
      ? DEMO_PARCELS.filter(p => {
          const mandalName = officerMandal.split('-').pop()?.toLowerCase();
          return p.mandalName.toLowerCase().includes(mandalName || '') ||
                 p.stateId === officerState ||
                 p.stateName.toLowerCase() === (officerState || '').toLowerCase();
        })
      : DEMO_PARCELS;

    const effectiveParcels = parcelsInScope.length > 0 ? parcelsInScope : DEMO_PARCELS;

    // 2. In-scope applications
    const appsInScope = role === 'officer' && officerMandal
      ? applications.filter(a => {
          const mandalName = officerMandal.split('-').pop()?.toLowerCase();
          return a.mandalId === officerMandal ||
                 a.mandalName.toLowerCase().includes(mandalName || '') ||
                 a.stateId === officerState;
        })
      : applications;

    const effectiveApps = appsInScope.length > 0 ? appsInScope : applications;

    // Signal A: Tax overdue > 1 year
    const overdueTaxParcels = effectiveParcels.filter(p => p.propertyTaxStatus === 'Overdue');

    // Signal B: Survey report mismatch with GIS boundary area (>5% variance)
    const areaMismatchApps = effectiveApps.filter(a =>
      a.aiDiscrepancy && Math.abs(a.aiDiscrepancy.variancePercent) >= 5
    );

    // Signal C: Encumbrance status changed or encumbered title (Mortgaged or Litigation)
    const encumbranceApps = effectiveApps.filter(a => {
      const p = DEMO_PARCELS.find(dp => dp.id === a.parcelId || dp.surveyNumber === a.surveyNumber);
      return p && (p.encumbranceStatus === 'Litigation' || p.encumbranceStatus === 'Mortgaged');
    });

    // Signal D: Master Plan Zoning non-conformance (e.g. agricultural without conversion or green belt)
    const zoningConflictParcels = effectiveParcels.filter(p =>
      p.masterPlanZone === 'Green Belt' || (p.landUse === 'Agricultural' && p.masterPlanZone === 'Industrial')
    );

    return [
      {
        id: 'tax-overdue',
        title: `${overdueTaxParcels.length} parcels flagged: property tax overdue > 1 year`,
        description: `Revenue recovery alert: ${overdueTaxParcels.slice(0, 3).map(p => `Survey #${p.surveyNumber} (${p.village})`).join(', ')}${overdueTaxParcels.length > 3 ? ` and ${overdueTaxParcels.length - 3} more` : ''} have property tax in arrears exceeding 12 months.`,
        severity: 'warning' as const,
        icon: <FileWarning size={18} className="text-amber-600" />,
        badgeText: 'Statutory Revenue Risk',
        actionLabel: role === 'officer' ? 'Inspect Cadastre' : 'View GIS Spatial Registry',
        actionPath: role === 'officer' ? '/officer/gis' : '/admin/gis',
      },
      {
        id: 'area-mismatch',
        title: `${areaMismatchApps.length} applications flagged: survey report mismatch with GIS boundary area (>5% variance)`,
        description: areaMismatchApps.length > 0
          ? `Cadastral boundary reconciliation discrepancy in ${areaMismatchApps.map(a => `${a.tokenNumber} (Survey #${a.surveyNumber}, variance: ${a.aiDiscrepancy?.variancePercent}%)`).join(', ')}. Scrutiny of FMB sketch required.`
          : `No active applications show >5% GIS survey extent variance in current jurisdiction queue.`,
        severity: 'danger' as const,
        icon: <AlertTriangle size={18} className="text-rose-600" />,
        badgeText: 'Cadastral Boundary Mismatch',
        actionLabel: role === 'officer' ? 'Review Application File' : 'Applications Registry',
        actionPath: role === 'officer'
          ? (areaMismatchApps[0] ? `/officer/applications/${areaMismatchApps[0].id}` : '/officer/applications')
          : '/admin/applications',
      },
      {
        id: 'encumbrance-alert',
        title: `${encumbranceApps.length > 0 ? encumbranceApps.length : 1} application${encumbranceApps.length > 1 ? 's' : ''} flagged: encumbrance status conflict on subject parcel`,
        description: encumbranceApps.length > 0
          ? `Application ${encumbranceApps.map(a => a.tokenNumber).join(', ')} involves land currently under active Bank Mortgage or Title Litigation. Prohibited property scrutiny mandated.`
          : `Parcel ${effectiveParcels[1]?.surveyNumber || '102/C'} has an active mortgage lien registered under Section 22A.`,
        severity: 'danger' as const,
        icon: <Scale size={18} className="text-purple-600" />,
        badgeText: 'Lien / Litigation Trigger',
        actionLabel: 'Check RoR & Liens',
        actionPath: role === 'officer' ? '/officer/interoperability' : '/admin/interoperability',
      },
      {
        id: 'zoning-conflict',
        title: `${zoningConflictParcels.length} parcels flagged: Master Plan Zoning non-conformance`,
        description: `Ecological / master plan buffer check: ${zoningConflictParcels.slice(0, 2).map(p => `Survey #${p.surveyNumber} (${p.masterPlanZone})`).join(', ')} flagged against municipal master plan zone reservations.`,
        severity: 'info' as const,
        icon: <ShieldAlert size={18} className="text-sky-600" />,
        badgeText: 'Master Plan Zoning Audit',
        actionLabel: 'Cadastral Map',
        actionPath: role === 'officer' ? '/officer/gis' : '/admin/gis',
      },
    ];
  }, [applications, role, officerMandal, officerState]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm font-sans space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-indigo-50 text-indigo-700">
              <Sparkles size={16} />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Rule-based governance insights (prototype)
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              Deterministic Logic · No ML
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Real-time heuristic compliance signals computed across cadastral geometry, revenue RoR ledgers, and municipal records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 size={13} className="text-emerald-600" />
            <span>4 Heuristic Rules Active</span>
          </span>
        </div>
      </div>

      {/* Grid of Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
        {insights.map(item => (
          <div
            key={item.id}
            className={cn(
              "p-4 rounded-2xl border transition-all flex flex-col justify-between",
              item.severity === 'danger'
                ? "bg-rose-50/40 border-rose-200/80 hover:border-rose-300"
                : item.severity === 'warning'
                ? "bg-amber-50/40 border-amber-200/80 hover:border-amber-300"
                : "bg-sky-50/40 border-sky-200/80 hover:border-sky-300"
            )}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white shadow-2xs border border-slate-100">
                    {item.icon}
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border",
                    item.severity === 'danger'
                      ? "bg-rose-100/80 text-rose-800 border-rose-200"
                      : item.severity === 'warning'
                      ? "bg-amber-100/80 text-amber-800 border-amber-200"
                      : "bg-sky-100/80 text-sky-800 border-sky-200"
                  )}>
                    {item.badgeText}
                  </span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">Derived from mock registry</span>
              <Link
                to={item.actionPath}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
              >
                <span>{item.actionLabel}</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
