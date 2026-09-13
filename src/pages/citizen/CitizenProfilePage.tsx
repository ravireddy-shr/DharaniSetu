import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { formatDate } from '../../utils';
import {
  User, Mail, Shield, MapPin, Building, Phone, Calendar,
  CreditCard, CheckCircle2, FileCheck, Layers, Landmark,
  Award, QrCode, AlertCircle
} from 'lucide-react';
import { DEMO_PARCELS, CITIZEN_PARCEL_IDS, getParcelsForCitizen } from '../../data/demoData';
import type { OfficerProfile, LandParcel } from '../../types';

export function CitizenProfilePage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { applications } = useAppStore();

  const isOfficer = user?.role === 'officer';
  const officer = isOfficer ? (user as OfficerProfile) : null;

  // Filter user's registered parcels
  const userParcels: LandParcel[] = user ? getParcelsForCitizen(user.state, user.name, user.email) : [];
  const totalExtent = userParcels.reduce((acc: number, curr: LandParcel) => acc + curr.area, 0);
  const totalSqFt = Math.round(totalExtent * 43560).toLocaleString('en-IN');


  return (
    <PageLayout role={user?.role || 'citizen'}>
      <DemoBanner />
      <PageHeader
        title={isOfficer ? t('profile.officerTitle', 'Officer Credentials & Jurisdiction') : t('nav.profile')}
        subtitle={isOfficer ? t('profile.officerSubtitle', 'Official administrative credentials and jurisdiction details') : t('profile.citizenSubtitle', 'Your verified citizen e-KYC profile, Pattadar passbook, and linked landholdings')}
        breadcrumb={[{ label: t('nav.home', 'Home') }, { label: t('nav.profile') }]}
      />

      <PageContent>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header ID Card */}
          <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-900/40 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white/10 border-2 border-emerald-400/40 flex items-center justify-center flex-shrink-0 text-3xl font-black text-emerald-300 shadow-inner">
                {user?.name?.[0] || 'U'}
              </div>

              <div className="text-center sm:text-left flex-1 min-w-0">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">{user?.name || t('profile.authorizedCitizen', 'Authorized Citizen')}</h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <CheckCircle2 size={12} className="text-emerald-400" />
                    {t('profile.uidaiVerified', 'UIDAI e-KYC Verified')}
                  </span>
                </div>

                <p className="text-xs text-emerald-200/80 font-semibold uppercase tracking-wider mt-1">
                  {isOfficer ? `${officer?.designation} · ${officer?.department} Department` : t('profile.primaryLandowner', 'Primary Landowner & Pattadar')}
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-300 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Mail size={13} className="text-emerald-400" />
                    {user?.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone size={13} className="text-emerald-400" />
                    +91 98765 43210
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CreditCard size={13} className="text-emerald-400" />
                    Aadhaar: XXXX-XXXX-4821
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0 bg-white/10 border border-white/15 px-4 py-2.5 rounded-2xl text-center backdrop-blur-xs">
                <span className="text-[10px] text-emerald-200 block uppercase font-bold tracking-wider">{t('profile.passbookNo', 'Passbook No')}</span>
                <span className="text-sm font-mono font-black text-white">PB-2026-88914</span>
              </div>
            </div>
          </div>

          {!isOfficer && (
            <>
              {/* Pattadar Passbook & Landholding Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('profile.registeredLandholdings', 'Registered Landholdings')}</span>
                    <Layers size={18} className="text-emerald-600" />
                  </div>
                  <p className="text-2xl font-black text-slate-900">{userParcels.length} {t('profile.parcels', 'Parcels')}</p>
                  <p className="text-xs text-slate-500 mt-1">{t('profile.totalExtent', 'Total Extent:')} <strong className="text-emerald-700">{totalExtent.toFixed(2)} {t('common.acres', 'Acres')}</strong></p>
                  <p className="text-[11px] text-slate-400 mt-0.5">({totalSqFt} sq.ft)</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('profile.ePattadarStatus', 'e-Pattadar Status')}</span>
                    <Award size={18} className="text-blue-600" />
                  </div>
                  <p className="text-2xl font-black text-blue-700">{t('profile.digitalTitleValid', 'Digital Title Valid')}</p>
                  <p className="text-xs text-slate-500 mt-1">{t('profile.rorRecord', 'ROR-1B Record:')} <strong className="text-slate-800">{t('profile.synchronized', 'Synchronized')}</strong></p>
                  <p className="text-[11px] text-emerald-600 mt-0.5 font-semibold">{t('profile.freeFromEncumbrances', 'Free from all encumbrances')}</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('profile.dbtStatus', 'Direct Benefit Transfer')}</span>
                    <Landmark size={18} className="text-indigo-600" />
                  </div>
                  <p className="text-2xl font-black text-indigo-700">{t('profile.dbtLinked', 'DBT Linked')}</p>
                  <p className="text-xs text-slate-500 mt-1">{t('profile.dbtBank', 'State Bank of India (Ending **4092)')}</p>
                  <p className="text-[11px] text-indigo-600 mt-0.5 font-semibold">{t('profile.dbtScheme', 'PM-KISAN / Rythu Bharosa Active')}</p>
                </div>
              </div>

              {/* Linked Land Parcels Table */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      <FileCheck size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{t('profile.linkedLandTitle', 'Linked Land Records (e-Pattadar Passbook)')}</h3>
                      <p className="text-xs text-slate-500">{t('profile.linkedLandSubtitle', 'Official cadastral parcels under your registered ownership')}</p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b border-slate-200/80">
                      <tr>
                        <th className="py-3 px-4">{t('profile.parcelId', 'Parcel ID')}</th>
                        <th className="py-3 px-4">{t('profile.surveyNo', 'Survey No')}</th>
                        <th className="py-3 px-4">{t('profile.villageMandal', 'Village / Mandal')}</th>
                        <th className="py-3 px-4">{t('profile.landType', 'Land Type')}</th>
                        <th className="py-3 px-4">{t('profile.extentAcres', 'Extent (Acres)')}</th>
                        <th className="py-3 px-4">{t('profile.calculatedSqft', 'Calculated Sq.Ft')}</th>
                        <th className="py-3 px-4">{t('profile.legalStatus', 'Legal Status')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {userParcels.map(p => (
                        <tr key={p.id} className="hover:bg-emerald-50/40 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">{p.id}</td>
                          <td className="py-3 px-4 font-bold text-emerald-700">{p.surveyNumber}</td>
                          <td className="py-3 px-4">{p.village}, {p.mandalName}</td>
                          <td className="py-3 px-4 capitalize font-semibold text-slate-700">{p.landUse}</td>
                          <td className="py-3 px-4 font-bold text-slate-900">{p.area} Ac</td>
                          <td className="py-3 px-4 font-mono font-semibold text-slate-600">
                            {Math.round(p.area * 43560).toLocaleString('en-IN')} sq.ft
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              {t('profile.cleanTitle', 'Clean Title')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Identity & Statutory Profile Details */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              {t('profile.identitySectionTitle', 'Identity, KYC & Communication Records')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-3 p-4 bg-slate-50/70 rounded-2xl border border-slate-100">
                <Mail size={18} className="text-slate-600 mt-0.5" />
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider">{t('profile.registeredEmail', 'Registered Email ID')}</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-slate-50/70 rounded-2xl border border-slate-100">
                <Shield size={18} className="text-emerald-600 mt-0.5" />
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider">{t('profile.secAuth', 'Security & Authentication')}</span>
                  <p className="font-semibold text-emerald-800 mt-0.5">{t('profile.aadhaarOtpActive', 'Aadhaar Linked Mobile OTP (2FA Active)')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-slate-50/70 rounded-2xl border border-slate-100">
                <MapPin size={18} className="text-indigo-600 mt-0.5" />
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider">{t('profile.permAddress', 'Permanent Residential Address')}</span>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    Door No. 4-22/A, Gandhi Road, Guntur Urban, Andhra Pradesh - 522002
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-slate-50/70 rounded-2xl border border-slate-100">
                <Landmark size={18} className="text-amber-600 mt-0.5" />
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider">{t('profile.nomineeDeclaration', 'Nominee Declaration')}</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{t('profile.nomineeShare', 'Lakshmi Reddy (Spouse) · 100% Share Registered')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-slate-50/70 rounded-2xl border border-slate-100">
                <Calendar size={18} className="text-slate-600 mt-0.5" />
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider">{t('profile.accountCreated', 'Account Creation Date')}</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{formatDate(user?.createdAt || new Date().toISOString())}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-slate-50/70 rounded-2xl border border-slate-100">
                <QrCode size={18} className="text-purple-600 mt-0.5" />
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider">{t('profile.digitalPublicKey', 'Dharani Digital Public Key')}</span>
                  <p className="font-mono text-[11px] font-bold text-slate-700 mt-0.5">0x7F9B...4D82 ({t('profile.eSignReady', 'e-Sign Ready')})</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}
