import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils';
import {
  LayoutDashboard, MapPin, Map, FileText, Send, ClipboardList,
  Search, Bell, FolderOpen, User, CheckSquare, Users,
  Building, Globe2, Layers, Shield, Network
} from 'lucide-react';

interface NavItem {
  key: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

const citizenNav: NavItem[] = [
  { key: 'dashboard',       label: 'nav.dashboard',       path: '/citizen/dashboard',     icon: <LayoutDashboard size={18} /> },
  { key: 'myLand',          label: 'nav.myLand',          path: '/citizen/my-land',        icon: <MapPin size={18} /> },
  { key: 'gis',             label: 'nav.gis',             path: '/citizen/gis',            icon: <Map size={18} /> },
  { key: 'services',        label: 'nav.services',        path: '/citizen/services',       icon: <FileText size={18} /> },
  { key: 'applyService',    label: 'nav.applyService',    path: '/citizen/apply',          icon: <Send size={18} /> },
  { key: 'myApplications',  label: 'nav.myApplications',  path: '/citizen/applications',   icon: <ClipboardList size={18} /> },
  { key: 'trackApplication',label: 'nav.trackApplication',path: '/citizen/track',          icon: <Search size={18} /> },
  { key: 'notifications',   label: 'nav.notifications',   path: '/citizen/notifications',  icon: <Bell size={18} /> },
  { key: 'documents',       label: 'nav.documents',       path: '/citizen/documents',      icon: <FolderOpen size={18} /> },
  { key: 'profile',         label: 'nav.profile',         path: '/citizen/profile',        icon: <User size={18} /> },
];

const officerNav: NavItem[] = [
  { key: 'dashboard',          label: 'nav.dashboard',          path: '/officer/dashboard',       icon: <LayoutDashboard size={18} /> },
  { key: 'applications',       label: 'nav.applications',       path: '/officer/applications',    icon: <ClipboardList size={18} /> },
  { key: 'pendingVerification',label: 'nav.pendingVerification',path: '/officer/pending',         icon: <CheckSquare size={18} /> },
  { key: 'approvals',          label: 'nav.approvals',          path: '/officer/approvals',       icon: <Shield size={18} /> },
  { key: 'completed',          label: 'nav.completed',          path: '/officer/completed',       icon: <FileText size={18} /> },
  { key: 'gis',                label: 'nav.gis',                path: '/officer/gis',             icon: <Map size={18} /> },
  { key: 'interoperability',   label: 'nav.interoperability',   path: '/officer/interoperability',icon: <Network size={18} /> },
  { key: 'notifications',      label: 'nav.notifications',      path: '/officer/notifications',   icon: <Bell size={18} /> },
  { key: 'profile',            label: 'nav.profile',            path: '/officer/profile',         icon: <User size={18} /> },
];

const adminNav: NavItem[] = [
  { key: 'dashboard',        label: 'nav.dashboard',      path: '/admin/dashboard',        icon: <LayoutDashboard size={18} /> },
  { key: 'users',            label: 'nav.users',          path: '/admin/users',            icon: <Users size={18} /> },
  { key: 'officers',         label: 'nav.officers',       path: '/admin/officers',         icon: <Building size={18} /> },
  { key: 'states',           label: 'nav.states',         path: '/admin/jurisdictions',    icon: <Globe2 size={18} /> },
  { key: 'services',         label: 'nav.services',       path: '/admin/services',         icon: <FileText size={18} /> },
  { key: 'applications',     label: 'nav.applications',   path: '/admin/applications',     icon: <ClipboardList size={18} /> },
  { key: 'gis',              label: 'nav.gis',            path: '/admin/gis',              icon: <Map size={18} /> },
  { key: 'interoperability', label: 'nav.interoperability',path: '/admin/interoperability',icon: <Network size={18} /> },
];

import { useAuthStore } from '../../store/authStore';
import type { OfficerProfile } from '../../types';

interface SidebarProps {
  role: 'citizen' | 'officer' | 'admin';
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ role, isOpen, onClose }: SidebarProps) {
  const { t } = useTranslation();
  const user = useAuthStore(s => s.user) as OfficerProfile | null;
  const nav = role === 'citizen' ? citizenNav : role === 'officer' ? officerNav : adminNav;

  const officerBadge = role === 'officer' && user?.department
    ? (user.department === 'Revenue' ? 'Revenue Officer (VRO)' : (user.department === 'Tahsildar' ? 'Tahsildar' : (user.designation || `${user.department} Officer`)))
    : t('nav.revenueOfficer', 'Revenue Officer (VRO)');

  const officerTitle = role === 'officer' && user?.department
    ? `${user.department} Desk`
    : t('nav.officerPortal', 'Officer Portal');

  const roleMeta = role === 'citizen' 
    ? { title: t('nav.citizenPortal', 'Citizen Portal'), badge: t('nav.publicCitizen', 'Public Citizen'), bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-200' }
    : role === 'officer' 
    ? { title: officerTitle, badge: officerBadge, bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' }
    : { title: t('nav.adminPortal', 'Admin Portal'), badge: t('nav.systemAdministrator', 'System Administrator'), bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-slate-200/80 overflow-y-auto z-30 transition-transform duration-200 flex flex-col font-sans shadow-xs',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Role tag card */}
        <div className="p-4 border-b border-slate-100 flex-shrink-0">
          <div className={cn('px-3.5 py-2 rounded-xl border flex items-center justify-between gap-2', roleMeta.bg, roleMeta.border)}>
            <div>
              <p className={cn('text-xs font-black uppercase tracking-wider', roleMeta.text)}>{roleMeta.title}</p>
              <p className="text-[11px] text-slate-500 font-medium">{roleMeta.badge}</p>
            </div>
            <div className={cn('w-2 h-2 rounded-full animate-pulse', role === 'officer' ? 'bg-emerald-500' : role === 'citizen' ? 'bg-sky-500' : 'bg-purple-500')} />
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-3 px-3 overflow-y-auto space-y-1">
          {nav.map(item => (
            <NavLink
              key={item.key}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all',
                isActive 
                  ? 'bg-emerald-50 text-emerald-700 font-bold border-l-4 border-emerald-600 shadow-xs pl-3' 
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              )}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="truncate">{t(item.label)}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex-shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Layers size={14} className="text-emerald-600" />
            <span className="text-xs font-bold text-slate-800">{t('nav.version', 'DharaniSetu v1.0')}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">{t('nav.dpiSubtitle', 'National Land Governance DPI')}</p>
        </div>
      </aside>
    </>
  );
}
