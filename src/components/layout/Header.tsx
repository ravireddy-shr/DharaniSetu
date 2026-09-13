import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  Bell, LogOut, User, Globe, Menu, ChevronDown,
  Home, FileText, Search, Map, HelpCircle
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { cn } from '../../utils';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { user, logout } = useAuthStore();
  const { getNotifications } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const notifications = user ? getNotifications(user.id) : [];
  const unread = notifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const switchLang = (lang: 'en' | 'hi' | 'te' | 'ta') => {
    i18n.changeLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dharani_language', lang);
    }
    setLangOpen(false);
  };

  const dashboardPath = user?.role === 'citizen' ? '/citizen/dashboard'
    : user?.role === 'officer' ? '/officer/dashboard'
    : '/admin/dashboard';

  const notifPath = user?.role === 'citizen' ? '/citizen/notifications'
    : user?.role === 'officer' ? '/officer/notifications'
    : '/admin/dashboard';

  const mapPath = user?.role === 'officer' ? '/officer/gis'
    : user?.role === 'admin' ? '/admin/gis'
    : user ? '/citizen/gis'
    : '/#gis-section';

  // Navigation Links: Home routes to dashboard when logged in; Track is hidden for officer/admin; Help routes to /contact
  const navLinks = [
    { label: t('nav.home', 'Home'), path: user ? dashboardPath : '/', icon: <Home size={16} /> },
    { label: t('nav.services', 'Services'), path: user ? '/citizen/services' : '/#services-section', icon: <FileText size={16} /> },
    ...(user?.role === 'officer' || user?.role === 'admin' ? [] : [
      { label: t('nav.track', t('nav.trackApplication', 'Track')), path: '/citizen/track', icon: <Search size={16} /> }
    ]),
    { label: t('nav.map', t('nav.gis', 'Map')), path: mapPath, icon: <Map size={16} /> },
    { label: t('nav.help', 'Help'), path: '/contact', icon: <HelpCircle size={16} /> },
  ];

  const currentLangLabel = i18n.language === 'te' ? 'తెలుగు'
    : i18n.language === 'ta' ? 'தமிழ்'
    : i18n.language === 'hi' ? 'हिन्दी'
    : 'English';

  return (
    <header className="bg-white border-b border-slate-200 text-slate-800 shadow-sm sticky top-0 z-40 h-16 flex items-center font-sans">
      <div className="flex items-center justify-between px-4 sm:px-6 h-full w-full max-w-7xl mx-auto">
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-3">
          {user && (
            <button
              onClick={onMenuToggle}
              className="text-slate-600 hover:text-emerald-700 lg:hidden p-1.5 rounded-lg hover:bg-slate-100"
            >
              <Menu size={22} />
            </button>
          )}

          <Link to={user ? dashboardPath : '/'} className="flex items-center gap-2.5 flex-shrink-0 group">
            <img
              src="/logo.png"
              alt="DharaniSetu Logo"
              className="w-9 h-9 rounded-full object-cover border border-emerald-600/30 shadow-sm group-hover:scale-105 transition-transform"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div>
              <div className="flex items-center">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">Dharani</span>
                <span className="font-extrabold text-lg text-emerald-600">Setu</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium -mt-1 hidden sm:block">
                {t('nav.tagline', 'One Land. Many Services. A Safer Tomorrow.')}
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links matching Reference UI */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '/');
            return (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all',
                  isActive
                    ? 'text-emerald-700 bg-emerald-50 border-b-2 border-emerald-600'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Language, Notifications & Login / Profile */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-xs sm:text-sm font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Globe size={15} className="text-emerald-600" />
              <span>{currentLangLabel}</span>
              <ChevronDown size={13} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1.5 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 w-36 py-1">
                {[
                  { code: 'en' as const, label: 'English' },
                  { code: 'te' as const, label: 'తెలుగు (Telugu)' },
                  { code: 'ta' as const, label: 'தமிழ் (Tamil)' },
                  { code: 'hi' as const, label: 'हिन्दी (Hindi)' },
                ].map(item => (
                  <button
                    key={item.code}
                    onClick={() => switchLang(item.code)}
                    className={cn(
                      'w-full text-left px-3.5 py-2 text-xs sm:text-sm hover:bg-slate-50 transition-colors',
                      i18n.language === item.code && 'font-bold text-emerald-700 bg-emerald-50'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          {user && (
            <Link
              to={notifPath}
              className="relative text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Bell size={18} />
              {unread > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {unread > 9 ? '9+' : unread}
                </span>
              )}
            </Link>
          )}

          {/* User Profile or Login Pill Button */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserOpen(!userOpen)}
                className="flex items-center gap-2 text-slate-800 hover:text-emerald-700 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm">
                  {user.name?.[0] || 'U'}
                </div>
                <span className="text-xs sm:text-sm font-semibold max-w-[110px] truncate hidden sm:inline">
                  {user.name}
                </span>
                <ChevronDown size={14} className="text-slate-500" />
              </button>

              {userOpen && (
                <div className="absolute right-0 top-full mt-1.5 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 w-52 py-1">
                  <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-xs text-emerald-700 font-semibold uppercase mt-0.5">{user.role}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs sm:text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                  >
                    <LogOut size={14} /> {t('nav.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm transition-all"
            >
              <User size={15} />
              <span>{t('nav.login', 'Login')}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
