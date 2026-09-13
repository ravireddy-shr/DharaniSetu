import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import type { Role } from '../../types';

import { useAuthStore } from '../../store/authStore';

interface PageLayoutProps {
  role: Role;
  children: ReactNode;
}

export function PageLayout({ role, children }: PageLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 pt-0">
        <Sidebar
          role={role}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 lg:ml-64 min-w-0 overflow-x-hidden pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  breadcrumb?: { label: string; path?: string }[];
}

export function PageHeader({ title, subtitle, action, breadcrumb }: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-5 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {breadcrumb && breadcrumb.length > 0 && (
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
              {breadcrumb.map((b, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-slate-300">/</span>}
                  {b.path ? (
                    <Link to={b.path} className="hover:text-emerald-700 transition-colors">{b.label}</Link>
                  ) : (
                    <span className={i === breadcrumb.length - 1 ? 'text-slate-900 font-bold' : ''}>{b.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{title}</h1>
          {subtitle && <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">{subtitle}</p>}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  );
}

export function PageContent({ children }: { children: ReactNode }) {
  return <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">{children}</div>;
}

export function DemoBanner() {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  // If a user is logged in (citizen, officer, or admin), do NOT suggest switching to other profiles
  if (user) {
    return null;
  }
  return (
    <div className="bg-amber-50/90 border-b border-amber-200/80 px-4 py-2 text-center text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-amber-900 font-medium">
          <span className="px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-[11px] font-bold uppercase tracking-wider">
            {t('common.demoSandbox', 'Workflow Sandbox')}
          </span>
          <span className="hidden sm:inline">Test multi-department sequential clearance:</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap justify-center text-[11px]">
          <span className="text-amber-800 font-bold mr-1">Quick Switch:</span>
          <Link
            to="/citizen/track?token=DS-AP-2026-000124"
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-bold border border-amber-200/80 shadow-2xs transition-all flex items-center gap-1"
          >
            <span>🔍 Live Tracker</span>
          </Link>
          <Link
            to="/citizen/services"
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-bold border border-amber-200/80 shadow-2xs transition-all flex items-center gap-1"
          >
            <span>👤 Apply as Citizen</span>
          </Link>
          <Link
            to="/officer/applications"
            className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold border border-blue-200 shadow-2xs transition-all flex items-center gap-1"
          >
            <span>🏛️ Department Queue</span>
          </Link>
          <Link
            to="/admin/dashboard"
            className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold border border-purple-200 shadow-2xs transition-all flex items-center gap-1"
          >
            <span>📊 Inter-Dept Matrix</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
