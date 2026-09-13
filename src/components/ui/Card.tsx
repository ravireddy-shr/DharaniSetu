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
    <div className={cn('bg-white rounded-2xl border border-slate-200 shadow-sm p-6 transition-all', className)}>
      {(title || action) && (
        <div className="flex items-start justify-between mb-4 gap-4">
          <div>
            {title && <h3 className="text-[20px] font-semibold text-[#0F172A] leading-snug">{title}</h3>}
            {subtitle && <p className="text-base text-slate-600 mt-1 font-normal">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={noPad ? '-mx-6 -mb-6' : ''}>{children}</div>
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

export function StatCard({ label, value, icon, color = 'bg-[#F0FDFA] text-[#115E59]', sub }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-all flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-base font-medium text-slate-600 truncate">{label}</p>
        <p className="text-3xl font-bold text-[#0F172A] mt-1.5 tracking-tight">{value}</p>
        {sub && (
          <span className="text-xs font-semibold mt-2.5 px-2.5 py-0.5 rounded-full inline-block bg-slate-100 text-slate-700 border border-slate-200">
            {sub}
          </span>
        )}
      </div>
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs text-xl', color)}>
        {icon}
      </div>
    </div>
  );
}
