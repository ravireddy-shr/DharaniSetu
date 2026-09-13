import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../store/authStore';
import { useAppStore } from '../../../store/appStore';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../../components/layout/PageLayout';
import { DEMO_PARCELS, getParcelsForCitizen } from '../../../data/demoData';
import { toast } from '../../../components/ui/Toast';
import {
  Upload, CheckCircle2, FileText, X, ArrowLeft, ArrowRight,
  Shield, Check, Send, Sparkles
} from 'lucide-react';
import type { Application, ServiceType } from '../../../types';

export interface CustomField {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'select' | 'textarea';
  placeholder?: string;
  options?: string[];
  required?: boolean;
  defaultValue?: string;
}

interface DedicatedServiceAppProps {
  serviceId: string;
  serviceType: ServiceType;
  title: string;
  category: string;
  slaDays: number;
  description: string;
  icon: React.ReactNode;
  requiredDocs: string[];
  customFields: CustomField[];
}

export function DedicatedServiceApp({
  serviceId,
  serviceType,
  title,
  category,
  slaDays,
  description,
  icon,
  requiredDocs,
  customFields,
}: DedicatedServiceAppProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { submitApplication } = useAppStore();

  const citizenParcels = user ? getParcelsForCitizen(user.state, user.name, user.email) : [];
  const [step, setStep] = useState<'form' | 'summary' | 'submitted'>('form');
  const [parcelId, setParcelId] = useState<string>(() => citizenParcels[0]?.id || '');

  useEffect(() => {
    if (citizenParcels.length > 0 && (!parcelId || !citizenParcels.some(p => p.id === parcelId))) {
      setParcelId(citizenParcels[0].id);
    }
  }, [citizenParcels, parcelId]);

  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    customFields.forEach(f => {
      if (f.defaultValue) init[f.name] = f.defaultValue;
    });
    return init;
  });
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; fileName: string; fileSize: number; mimeType: string; fileData?: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<Application | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedParcel = citizenParcels.find(p => p.id === parcelId) || citizenParcels[0] || DEMO_PARCELS[0];

  const handleFieldChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(f => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileData = event.target?.result as string;
        setUploadedFiles(prev => [
          ...prev,
          {
            name: f.name.replace(/\.[^.]+$/, '').replace(/_/g, ' '),
            fileName: f.name,
            fileSize: f.size,
            mimeType: f.type,
            fileData,
          }
        ]);
      };
      if (f.type.startsWith('image/') || f.type === 'application/pdf' || f.size < 5000000) {
        reader.readAsDataURL(f);
      } else {
        setUploadedFiles(prev => [
          ...prev,
          {
            name: f.name.replace(/\.[^.]+$/, '').replace(/_/g, ' '),
            fileName: f.name,
            fileSize: f.size,
            mimeType: f.type,
          }
        ]);
      }
    });
  };

  const removeFile = (idx: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!parcelId) errs.parcelId = 'Please select a land parcel.';
    customFields.forEach(f => {
      if (f.required && !formData[f.name]?.trim()) {
        errs[f.name] = `${f.label} is required.`;
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!user || !selectedParcel) return;
    setLoading(true);
    try {
      const app = submitApplication({
        citizenId: user.id,
        citizenName: user.name,
        citizenEmail: user.email,
        serviceId,
        parcelId,
        surveyNumber: selectedParcel.surveyNumber,
        village: selectedParcel.village,
        mandalId: selectedParcel.mandalId,
        mandalName: selectedParcel.mandalName,
        districtId: selectedParcel.districtId,
        districtName: selectedParcel.districtName,
        stateId: selectedParcel.stateId,
        stateName: selectedParcel.stateName,
        formData,
        uploadedDocs: uploadedFiles.length > 0 ? uploadedFiles : [
          { name: requiredDocs[0] || 'Application Document', fileName: 'scanned_deed.pdf', fileSize: 184000, mimeType: 'application/pdf' },
          { name: 'Identity Proof', fileName: 'aadhaar_card.jpg', fileSize: 94000, mimeType: 'image/jpeg' },
        ],
      });
      setSubmittedApp(app);
      setStep('submitted');
      toast('success', 'Application Submitted', `Token: ${app.tokenNumber}`);
    } catch {
      toast('error', 'Submission Failed', 'Please try again.');
    }
    setLoading(false);
  };

  if (step === 'submitted' && submittedApp) {
    return (
      <PageLayout role="citizen">
        <DemoBanner />
        <PageContent>
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={36} />
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 uppercase">
              {t('common.statutoryAppRegistered', 'Statutory Application Registered')}
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">{title}</h2>
            <p className="text-sm text-slate-500 mt-1">
              {t('common.statutoryAppSubHeader', 'Your application has been routed directly to the jurisdiction Tahsildar for verification.')}
            </p>

            <div className="my-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase">{t('common.appTokenNumber', 'Application Token Number')}</span>
                <span className="font-mono text-sm font-black text-emerald-700">{submittedApp.tokenNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase">{t('common.surveyNumber', 'Survey Number')}</span>
                <span className="text-xs font-bold text-slate-800">#{submittedApp.surveyNumber} ({submittedApp.village})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase">{t('common.jurisdictionOfficer', 'Jurisdiction Officer')}</span>
                <span className="text-xs font-bold text-slate-800">{submittedApp.assignedOfficerName || 'Tahsildar Office'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase">{t('common.statutorySlaTarget', 'Statutory SLA Target')}</span>
                <span className="text-xs font-bold text-slate-800">{slaDays} {t('common.businessDays', 'Business Days')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to={`/citizen/track?token=${submittedApp.tokenNumber}`}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                {t('common.trackLiveProgress', 'Track Live Progress')}
              </Link>
              <Link
                to="/citizen/dashboard"
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all"
              >
                {t('common.returnToDashboard', 'Return to Dashboard')}
              </Link>
            </div>
          </div>
        </PageContent>
      </PageLayout>
    );
  }

  return (
    <PageLayout role="citizen">
      <DemoBanner />
      <PageHeader
        title={title}
        subtitle={`${category} Department · Statutory SLA: ${slaDays} Days`}
        breadcrumb={[
          { label: 'Home', path: '/citizen/dashboard' },
          { label: 'Services', path: '/citizen/services' },
          { label: title },
        ]}
      />

      <PageContent>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Service Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-3xl p-6 shadow-md flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                {icon}
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                  {category} Portal
                </span>
                <h2 className="text-xl font-black">{title}</h2>
                <p className="text-xs text-slate-300 mt-0.5">{description}</p>
              </div>
            </div>
            <Link
              to="/citizen/services"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold"
            >
              <ArrowLeft size={14} />
              <span>{t('common.allServices', 'All Services')}</span>
            </Link>
          </div>

          {/* Step 1: Form Fill */}
          {step === 'form' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
              {/* Land Parcel Selection */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                  {t('common.step1SelectLand', 'Step 1: Select Registered Landholding')} ({citizenParcels.length} {citizenParcels.length === 1 ? 'Plot' : 'Plots'})
                </h3>
                {citizenParcels.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    No registered landholdings found for your profile. Please ensure your Pattadar passbook is linked.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {citizenParcels.map(p => (
                      <div
                        key={p.id}
                        onClick={() => setParcelId(p.id)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                          parcelId === p.id
                            ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs font-bold text-slate-900">{t('common.surveyNumber', 'Survey Number')} #{p.surveyNumber}</span>
                          <span className="text-[10px] uppercase font-bold bg-white text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                            {p.area} {t('common.acres', 'Acres')} ({Math.round(p.area * 43560).toLocaleString('en-IN')} {t('common.sqft', 'sq.ft')})
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">{p.village}, {p.mandalName}</p>
                        <p className="text-[11px] text-slate-400 mt-1">{p.districtName}, {p.stateName}</p>
                      </div>
                    ))}
                  </div>
                )}
                {errors.parcelId && <p className="text-xs text-rose-600 mt-1">{errors.parcelId}</p>}
              </div>

              {/* Service Specific Form Fields */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                  {t('common.step2AppSpecifics', 'Step 2: Statutory Application Specifics')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {customFields.map(f => (
                    <div key={f.name} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
                      <label className="gov-label">
                        {f.label} {f.required && '*'}
                      </label>
                      {f.type === 'textarea' ? (
                        <textarea
                          className="gov-input min-h-[90px]"
                          placeholder={f.placeholder}
                          value={formData[f.name] || ''}
                          onChange={e => handleFieldChange(f.name, e.target.value)}
                        />
                      ) : f.type === 'select' ? (
                        <select
                          className="gov-input"
                          value={formData[f.name] || ''}
                          onChange={e => handleFieldChange(f.name, e.target.value)}
                        >
                          <option value="">{t('common.selectOption', 'Select option')}</option>
                          {f.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : (
                        <input
                          className="gov-input"
                          type={f.type || 'text'}
                          placeholder={f.placeholder}
                          value={formData[f.name] || ''}
                          onChange={e => handleFieldChange(f.name, e.target.value)}
                        />
                      )}
                      {errors[f.name] && <p className="text-xs text-rose-600 mt-1">{errors[f.name]}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Uploads */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                  {t('common.step3EvidenceDocs', 'Step 3: Statutory Evidence Documents')}
                </h3>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="mb-3">
                    <p className="text-xs font-bold text-slate-700">{t('common.requiredDocs', 'Statutory Requirements for')} {title}:</p>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      {requiredDocs.map(doc => (
                        <span key={doc} className="text-xs bg-white text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1 font-medium">
                          <FileText size={12} className="text-emerald-600" />
                          <span>{doc}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer bg-white transition-all"
                  >
                    <Upload size={24} className="text-emerald-600 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-800">{t('common.uploadDocumentsHint', 'Click to upload scanned documents or PDFs')}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{t('common.maxFileSize', 'Maximum file size: 10 MB per document')}</p>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {uploadedFiles.map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 text-xs">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-emerald-600" />
                            <span className="font-semibold text-slate-800">{file.name}</span>
                            <span className="text-slate-400">({(file.fileSize / 1024).toFixed(1)} KB)</span>
                          </div>
                          <button onClick={() => removeFile(i)} className="text-rose-600 hover:text-rose-800">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    if (validate()) setStep('summary');
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center gap-2"
                >
                  <span>{t('common.reviewAppSummary', 'Review Application Summary')}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Summary Verification */}
          {step === 'summary' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">{t('common.reviewAndConfirm', 'Review & Confirm Application')}</h3>
                  <p className="text-xs text-slate-500">{t('common.verifyDetailsBeforeSubmit', 'Please verify all statutory details before final submission')}</p>
                </div>
                <button
                  onClick={() => setStep('form')}
                  className="text-xs text-emerald-700 font-bold hover:underline"
                >
                  {t('common.editDetails', 'Edit Details')}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-slate-400 uppercase font-bold text-[10px] block">{t('common.serviceType', 'Service Type')}</span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{title}</p>
                  <p className="text-slate-500 mt-1">{t('common.statutorySlaTarget', 'SLA Timeline')}: {slaDays} {t('common.businessDays', 'Days')}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-slate-400 uppercase font-bold text-[10px] block">{t('common.landParcel', 'Land Parcel')}</span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{t('common.surveyNumber', 'Survey Number')} #{selectedParcel.surveyNumber}</p>
                  <p className="text-slate-500 mt-1">{selectedParcel.village}, {selectedParcel.mandalName} ({selectedParcel.area} {t('common.acres', 'ac')})</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <span className="text-slate-400 uppercase font-bold text-[10px] block mb-2">{t('common.formDataDeclarations', 'Form Data Declarations')}</span>
                {customFields.map(f => (
                  <div key={f.name} className="flex items-center justify-between py-1 border-b border-slate-200/50">
                    <span className="text-slate-600 font-semibold">{f.label}</span>
                    <span className="font-bold text-slate-900">{formData[f.name] || 'N/A'}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <Shield size={16} className="text-emerald-600" />
                  <span>{t('common.statutoryDeclaration', 'Statutory Applicant Declaration')}</span>
                </div>
                <p className="text-emerald-800 leading-relaxed">
                  {t('common.statutoryDeclarationText', 'I hereby solemnly declare that the information and scanned documents furnished above are true and legally valid. I understand that misrepresentation constitutes an offense under the Indian Penal Code and Land Revenue Act.')}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setStep('form')}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  {t('common.backToForm', '← Back to Form')}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Send size={16} />
                  <span>{loading ? t('common.submittingToRevenue', 'Submitting to Revenue Dept...') : t('common.submitStatutoryApplication', 'Submit Statutory Application')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </PageContent>
    </PageLayout>
  );
}
