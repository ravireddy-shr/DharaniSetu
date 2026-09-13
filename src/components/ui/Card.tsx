import { cn } from '../../utils';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  noPad?: boolean;
}

export function Card({ children, className, title, subtitle, action, noPad }: CardProps) {
  return (
    <div className={cn('bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6 transition-all', className)}>
      {(title || action) && (
        <div className="flex items-start justify-between mb-4 gap-4">
          <div>
            {title && <h3 className="text-base sm:text-lg font-bold text-slate-900">{title}</h3>}
            {subtitle && <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={noPad ? '-mx-5 -mb-5 sm:-mx-6 sm:-mb-6' : ''}>{children}</div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
  sub?: string;
}

export function StatCard({ label, value, icon, color = 'bg-emerald-50 text-emerald-700', sub }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 hover:shadow-md transition-all flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs sm:text-sm font-semibold text-slate-500 truncate">{label}</p>
        <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 tracking-tight">{value}</p>
        {sub && (
          <span className="text-[11px] font-bold mt-2 px-2 py-0.5 rounded-full inline-block bg-slate-100 text-slate-700 border border-slate-200">
            {sub}
          </span>
        )}
      </div>
      <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs', color)}>
        {icon}
      </div>
    </div>
  );
}
