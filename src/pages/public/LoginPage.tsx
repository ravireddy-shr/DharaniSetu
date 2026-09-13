import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { DEMO_FARMER_CITIZENS, DEMO_OFFICERS, DEMO_ADMIN } from '../../data/demoData';
import { toast } from '../../components/ui/Toast';
import { cn } from '../../utils';
import {
  Lock, Mail, KeyRound, Search, X, Users, ArrowRight, ShieldCheck, Check
} from 'lucide-react';

export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout, loginWithPassword } = useAuthStore();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Directory Modal (144 Citizens & 40+ Officers)
  const [showDirectoryModal, setShowDirectoryModal] = useState(false);
  const [directoryTab, setDirectoryTab] = useState<'citizens' | 'officers'>('citizens');
  const [citizenSearch, setCitizenSearch] = useState('');
  const [citizenStateFilter, setCitizenStateFilter] = useState('ALL');
  const [officerSearch, setOfficerSearch] = useState('');
  const [officerDeptFilter, setOfficerDeptFilter] = useState('ALL');

  // Submit Login handler
  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userId.trim()) {
      setError('Please enter your User ID or Email');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your Password');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await loginWithPassword(userId, password);
      if (result.success) {
        toast('success', 'Login Successful', `Welcome to DharaniSetu`);
        if (result.role === 'citizen') {
          navigate('/citizen/dashboard');
        } else if (result.role === 'officer') {
          navigate('/officer/dashboard');
        } else if (result.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/citizen/dashboard');
        }
      } else {
        setError(result.error || 'Invalid credentials. Please try again.');
      }
    } catch {
      setError('Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Fill citizen credentials into the login form without auto-signing in
  const handleSelectCitizenCredentials = (citizen: typeof DEMO_FARMER_CITIZENS[0]) => {
    setUserId(citizen.email);
    setPassword('citizen123');
    setError('');
    setShowDirectoryModal(false);
    toast('info', 'Credentials Loaded', `Loaded credentials for Citizen ${citizen.name}. Click LOGIN to continue.`);
  };

  // Fill officer credentials into the login form without auto-signing in
  const handleSelectOfficerCredentials = (email: string, title: string) => {
    setUserId(email);
    setPassword('officer123');
    setError('');
    setShowDirectoryModal(false);
    toast('info', 'Credentials Loaded', `Loaded ${title} credentials (${email}). Click LOGIN to continue.`);
  };

  // Fill admin credentials into the login form without auto-signing in
  const handleSelectAdminCredentials = () => {
    setUserId('admin@dharanisetu.gov.in');
    setPassword('admin123');
    setError('');
    setShowDirectoryModal(false);
    toast('info', 'Credentials Loaded', 'Loaded Administrator credentials. Click LOGIN to continue.');
  };

  // If already logged in, show active session notification card
  if (user) {
    const userRoleDashboard =
      user.role === 'citizen'
        ? '/citizen/dashboard'
        : user.role === 'officer'
        ? '/officer/dashboard'
        : '/admin/dashboard';

    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center space-y-5">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#F0FDFA] text-[#115E59] flex items-center justify-center">
            <ShieldCheck size={32} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A]">{t('auth.activeSession', 'Active Session')}</h2>
            <p className="text-sm text-slate-600 mt-1">
              {t('auth.currentlySignedIn', 'Currently signed in as')} <strong className="text-[#0F172A]">{user.name}</strong> ({user.role})
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => navigate(userRoleDashboard)}
              className="w-full py-3 rounded-full bg-[#115E59] hover:bg-[#0D4845] text-white text-base font-bold shadow-md transition-all uppercase"
            >
              {t('auth.continueToDashboard', 'Continue to Dashboard')}
            </button>

            <button
              onClick={() => {
                logout();
                toast('info', t('auth.signedOut', 'Signed Out'), t('auth.signedOutMsg', 'You have been signed out.'));
              }}
              className="w-full py-2.5 rounded-full border-[1.5px] border-[#94A3B8] text-slate-700 hover:bg-[#F8FAFC] text-sm font-semibold transition-all"
            >
              {t('auth.signInAnother', 'Sign In with Another Account')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans justify-between items-center py-6 px-4">
      {/* Top spacer */}
      <div className="w-full flex items-center justify-center">
        {/* DharaniSetu Logo + Branding styled like reference header */}
        <Link to="/" className="flex flex-col items-center group">
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#1D0A69]">
              Dharani<span className="text-[#D97706] ml-0.5">Setu</span>
            </span>
          </div>
          <p className="text-xs text-slate-600 font-semibold tracking-wider uppercase mt-0.5">
            Sustainable Growth • Sustainable Future
          </p>
        </Link>
      </div>

      {/* Center Login Container matching reference screenshot */}
      <div className="w-full max-w-[360px] sm:max-w-[400px] flex flex-col items-center my-auto">
        {/* Illustrated plant foliage art in Forest Teal & Navy palette */}
        <div className="w-48 h-24 relative flex items-end justify-center mb-1 select-none pointer-events-none">
          <svg
            viewBox="0 0 200 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-xs"
          >
            {/* Soft decorative background dots/sparks */}
            <circle cx="60" cy="30" r="2.5" fill="#99F6E4" />
            <circle cx="140" cy="25" r="2" fill="#5EEAD4" />
            <circle cx="100" cy="15" r="3" fill="#D97706" />
            <path d="M50 40 L54 44 M50 44 L54 40" stroke="#115E59" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M150 35 L154 39 M150 39 L154 35" stroke="#115E59" strokeWidth="1.5" strokeLinecap="round" />

            {/* Lush leaves layer in Forest Teal (#115E59) and accents */}
            <path
              d="M65 95 C60 65 65 35 78 20 C76 38 78 68 85 95 Z"
              fill="#0D4845"
            />
            <path
              d="M135 95 C140 65 135 35 122 20 C124 38 122 68 115 95 Z"
              fill="#0D4845"
            />
            <path
              d="M45 95 C40 75 42 50 56 35 C52 52 56 75 62 95 Z"
              fill="#115E59"
            />
            <path
              d="M155 95 C160 75 158 50 144 35 C148 52 144 75 138 95 Z"
              fill="#115E59"
            />
            <path
              d="M100 95 C90 70 85 45 100 15 C115 45 110 70 100 95 Z"
              fill="#134E48"
            />
            <path
              d="M100 95 L100 25"
              stroke="#0D4845"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M80 95 C65 75 68 55 86 38 C94 58 88 80 82 95 Z"
              fill="#115E59"
            />
            <path
              d="M120 95 C135 75 132 55 114 38 C106 58 112 80 118 95 Z"
              fill="#115E59"
            />
            <circle cx="150" cy="55" r="3" fill="#D97706" />
            <circle cx="158" cy="48" r="2.5" fill="#115E59" />
            <circle cx="50" cy="55" r="3" fill="#D97706" />
            <circle cx="42" cy="48" r="2.5" fill="#115E59" />
          </svg>
        </div>

        {/* Heading: H1 32px bold #1D0A69 */}
        <h1 className="text-[32px] font-bold text-[#1D0A69] tracking-tight text-center">
          Login
        </h1>
        <p className="text-base text-slate-600 font-normal text-center mt-1 mb-6">
          Sign in to continue
        </p>

        {/* Form Fields matching outdoor sunlight visibility */}
        <form onSubmit={handleLogin} className="w-full space-y-4">
          {/* User ID Field */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-1.5 ml-3">
              {t('auth.userId', 'User ID')}
            </label>
            <div className="relative">
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder={t('auth.userIdOrEmail', 'User ID or Email')}
                className="w-full rounded-full border-[1.5px] border-[#94A3B8] bg-white px-5 py-3 text-base text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#115E59] focus:ring-2 focus:ring-[#115E59]/25 transition-all shadow-xs"
                autoComplete="username"
              />
              <Mail size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-1.5 ml-3">
              {t('auth.password', 'Password')}
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-full border-[1.5px] border-[#94A3B8] bg-white px-5 py-3 text-base text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#115E59] focus:ring-2 focus:ring-[#115E59]/25 transition-all shadow-xs"
                autoComplete="current-password"
              />
              <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-[#DC2626] text-sm font-semibold text-center leading-snug">
              {error}
            </div>
          )}

          {/* CTA LOGIN button in Secondary (Forest Teal #115E59) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#115E59] hover:bg-[#0D4845] active:scale-[0.99] text-white font-bold tracking-wider py-3.5 text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 uppercase"
            >
              {loading ? t('auth.loggingIn', 'LOGGING IN...') : t('auth.loginBtn', 'LOGIN')}
            </button>
          </div>
        </form>

        {/* Directory & Help links below the login button */}
        <div className="mt-6 flex flex-col items-center gap-3 text-center">
          <button
            type="button"
            onClick={() => setShowDirectoryModal(true)}
            className="text-sm font-semibold text-[#115E59] hover:text-[#0D4845] hover:underline flex items-center gap-1.5 transition-colors"
          >
            <Users size={16} />
            <span>{t('auth.browseDirectory', 'Browse 144 Citizen Logins & Official Directory')}</span>
          </button>

          <div className="bg-slate-100/80 px-3.5 py-2 rounded-full border border-slate-200/60 text-xs text-slate-600 font-medium">
            {t('auth.defaultPasswords', 'Default Passwords:')} <span className="text-[#0F172A] font-bold">citizen123</span> ({t('nav.publicCitizen', 'Citizen')}) · <span className="text-[#0F172A] font-bold">officer123</span> ({t('roles.officer', 'Officer')}) · <span className="text-[#0F172A] font-bold">admin123</span> ({t('roles.admin', 'Admin')})
          </div>
        </div>
      </div>

      {/* Bottom status text matching "Can't reach server? Update Server" style */}
      <div className="text-xs text-slate-500 text-center mt-6">
        <span>{t('auth.needAssistance', 'Need assistance?')} </span>
        <button
          type="button"
          onClick={() => setShowDirectoryModal(true)}
          className="text-[#115E59] hover:underline font-semibold"
        >
          {t('auth.viewDirectory', 'View Verified User Directory')}
        </button>
      </div>

      {/* 144 Citizens & Government Officers Directory Modal */}
      {showDirectoryModal && (
        <div className="fixed inset-0 z-[1000] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#059669] flex items-center justify-center font-bold">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                    144 Verified Citizens & Officials Directory
                  </h3>
                  <p className="text-xs text-slate-500">
                    Select any citizen or government official to auto-fill their credentials into the login form
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDirectoryModal(false)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Officer Logins Section */}
            <div className="p-3 bg-[#F0FDFA] border-b border-[#CCFBF1] px-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#115E59]">Quick Government Officer Logins:</span>
                <span className="text-[10px] text-slate-500 font-semibold">Password: officer123</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleSelectOfficerCredentials('tahsildar@dharanisetu.gov.in', 'Tahsildar')}
                  className="px-2.5 py-1 bg-[#1D0A69] hover:bg-[#160854] text-white rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                >
                  <span>🏛️ Tahsildar</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectOfficerCredentials('vro@dharanisetu.gov.in', 'Revenue Officer (VRO)')}
                  className="px-2.5 py-1 bg-[#115E59] hover:bg-[#0D4845] text-white rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                >
                  <span>📋 Revenue (VRO)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectOfficerCredentials('surveyor@dharanisetu.gov.in', 'Cadastral Surveyor')}
                  className="px-2.5 py-1 bg-[#0D4845] hover:bg-[#08302E] text-white rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                >
                  <span>📐 Surveyor</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectOfficerCredentials('subregistrar@dharanisetu.gov.in', 'Sub-Registrar')}
                  className="px-2.5 py-1 bg-indigo-700 hover:bg-indigo-800 text-white rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                >
                  <span>📜 Sub-Registrar</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectOfficerCredentials('planner@dharanisetu.gov.in', 'Town Planner')}
                  className="px-2.5 py-1 bg-[#D97706] hover:bg-[#B45309] text-white rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                >
                  <span>🏗️ Town Planner</span>
                </button>
                <button
                  type="button"
                  onClick={handleSelectAdminCredentials}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-900 text-white rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-1 ml-auto"
                >
                  <span>🛡️ Administrator</span>
                </button>
              </div>
            </div>

            {/* Directory Tabs: Citizens vs Government Officers */}
            <div className="px-5 pt-3 pb-2 border-b border-slate-200 bg-[#F8FAFC] flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDirectoryTab('citizens')}
                className={cn(
                  'px-4 py-1.5 rounded-xl text-xs font-bold transition-all',
                  directoryTab === 'citizens'
                    ? 'bg-[#115E59] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                )}
              >
                144 Citizens Directory
              </button>
              <button
                type="button"
                onClick={() => setDirectoryTab('officers')}
                className={cn(
                  'px-4 py-1.5 rounded-xl text-xs font-bold transition-all',
                  directoryTab === 'officers'
                    ? 'bg-[#1D0A69] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                )}
              >
                Government Officers Directory ({DEMO_OFFICERS.length})
              </button>
            </div>

            {directoryTab === 'citizens' ? (
              <>
                {/* Modal Controls: Search and State Filter for 144 Citizens */}
                <div className="p-4 border-b border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-80">
                    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={citizenSearch}
                      onChange={(e) => setCitizenSearch(e.target.value)}
                      placeholder="Search by citizen name, survey no, village..."
                      className="w-full pl-9 pr-4 py-2 rounded-full border-[1.5px] border-[#94A3B8] text-xs font-medium focus:ring-2 focus:ring-[#115E59]/25 focus:border-[#115E59] outline-none"
                      autoFocus
                    />
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Filter State:</span>
                    {['ALL', 'AP', 'TG', 'TN', 'CG'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setCitizenStateFilter(st)}
                        className={cn(
                          'px-3 py-1 rounded-full text-xs font-bold transition-all',
                          citizenStateFilter === st
                            ? 'bg-[#115E59] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        )}
                      >
                        {st === 'ALL' ? 'All 144 Citizens' : st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Citizens List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 divide-y divide-slate-100">
                  {DEMO_FARMER_CITIZENS.filter((citizen) => {
                    const q = citizenSearch.toLowerCase();
                    const matchSearch =
                      citizen.name.toLowerCase().includes(q) ||
                      citizen.email.toLowerCase().includes(q) ||
                      citizen.surveyNumber.toLowerCase().includes(q) ||
                      citizen.village.toLowerCase().includes(q) ||
                      citizen.parcelId.toLowerCase().includes(q);
                    const matchState = citizenStateFilter === 'ALL' || citizen.state === citizenStateFilter;
                    return matchSearch && matchState;
                  }).map((citizen, idx) => (
                    <div
                      key={citizen.id}
                      className="pt-2.5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl hover:bg-[#F0FDFA] transition-colors border border-transparent hover:border-[#99F6E4]"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-[#F0FDFA] text-[#115E59] font-bold flex items-center justify-center text-xs flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-[#0F172A]">{citizen.name}</span>
                            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F0FDFA] text-[#115E59] border border-[#99F6E4]">
                              Survey #{citizen.surveyNumber}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              {citizen.parcelId}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap font-mono">
                            <span className="text-[#115E59] font-semibold">{citizen.email}</span>
                            <span>·</span>
                            <span>{citizen.village} ({citizen.state})</span>
                            <span>·</span>
                            <span>{citizen.totalAreaAcres} Acres</span>
                            <span>·</span>
                            <span className="text-slate-400">Passbook: {citizen.passbookNumber}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSelectCitizenCredentials(citizen)}
                        className="px-4 py-2 bg-[#115E59] hover:bg-[#0D4845] text-white rounded-full text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 flex-shrink-0"
                      >
                        <span>Use Credentials</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Officers Controls: Search and Dept Filter */}
                <div className="p-4 border-b border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-80">
                    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={officerSearch}
                      onChange={(e) => setOfficerSearch(e.target.value)}
                      placeholder="Search by officer name, designation, department..."
                      className="w-full pl-9 pr-4 py-2 rounded-full border-[1.5px] border-[#94A3B8] text-xs font-medium focus:ring-2 focus:ring-[#1D0A69]/25 focus:border-[#1D0A69] outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Department:</span>
                    {['ALL', 'Revenue', 'Tahsildar', 'Survey', 'Registration', 'Town Planning'].map((dept) => (
                      <button
                        key={dept}
                        onClick={() => setOfficerDeptFilter(dept)}
                        className={cn(
                          'px-3 py-1 rounded-full text-xs font-bold transition-all',
                          officerDeptFilter === dept
                            ? 'bg-[#1D0A69] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        )}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Officers List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 divide-y divide-slate-100">
                  {DEMO_OFFICERS.filter((officer) => {
                    const q = officerSearch.toLowerCase();
                    const matchSearch =
                      officer.name.toLowerCase().includes(q) ||
                      officer.email.toLowerCase().includes(q) ||
                      officer.designation.toLowerCase().includes(q) ||
                      officer.department.toLowerCase().includes(q) ||
                      officer.jurisdictionMandal.toLowerCase().includes(q);
                    const matchDept = officerDeptFilter === 'ALL' || officer.department === officerDeptFilter;
                    return matchSearch && matchDept;
                  }).map((officer, idx) => (
                    <div
                      key={officer.id}
                      className="pt-2.5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl hover:bg-[#F3F0FC]/50 transition-colors border border-transparent hover:border-[#DDD6FE]"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-[#F3F0FC] text-[#1D0A69] font-bold flex items-center justify-center text-xs flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-[#0F172A]">{officer.name}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F0FDFA] text-[#115E59] border border-[#99F6E4]">
                              {officer.department}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                              {officer.designation}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap font-mono">
                            <span className="text-slate-800 font-semibold">{officer.email}</span>
                            <span>·</span>
                            <span>Mandal: {officer.jurisdictionMandal}</span>
                            <span>·</span>
                            <span>State: {officer.jurisdictionState}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSelectOfficerCredentials(officer.email, officer.designation)}
                        className="px-4 py-2 bg-[#1D0A69] hover:bg-[#160854] text-white rounded-full text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 flex-shrink-0"
                      >
                        <span>Use Credentials</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Modal Footer Note */}
            <div className="p-3 bg-[#F8FAFC] border-t border-slate-200 text-center text-xs text-slate-500">
              Clicking <strong className="text-slate-700">"Use Credentials"</strong> fills that user's email and password into the login page. Then, click <strong className="text-[#115E59]">LOGIN</strong> to sign in.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
