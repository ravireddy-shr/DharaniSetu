import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '../../components/layout/Header';
import { toast } from '../../components/ui/Toast';
import {
  Phone, Mail, Clock, Send, MessageSquare,
  HelpCircle, ChevronDown, CheckCircle2, Shield
} from 'lucide-react';

export function ContactPage() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('AP');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast('error', 'Missing Information', 'Please fill in all required fields.');
      return;
    }
    setSubmitted(true);
    toast('success', 'Inquiry Registered', 'Your ticket has been logged with National Revenue Helpdesk.');
  };

  const stateCodes = ['AP', 'TS', 'TN', 'CH'] as const;
  const helplineMeta = {
    AP: {
      phone: '1800-425-4440',
      email: 'support-ap@dharanisetu.gov.in',
      defaultName: 'Andhra Pradesh',
    },
    TS: {
      phone: '1800-599-4788',
      email: 'support-ts@dharanisetu.gov.in',
      defaultName: 'Telangana',
    },
    TN: {
      phone: '1800-425-1333',
      email: 'support-tn@dharanisetu.gov.in',
      defaultName: 'Tamil Nadu',
    },
    CH: {
      phone: '0172-2740405',
      email: 'support-ch@dharanisetu.gov.in',
      defaultName: 'Chandigarh',
    },
  };

  const stateHelplines = stateCodes.map((code) => ({
    code,
    state: t(`contact.states.${code}.name`, helplineMeta[code].defaultName),
    helpline: helplineMeta[code].phone,
    email: helplineMeta[code].email,
    office: t(`contact.states.${code}.office`),
    hours: t(`contact.states.${code}.hours`),
  }));

  const defaultFaqs = [
    {
      q: 'How do I track my land mutation application?',
      a: 'Enter your 16-character alphanumeric Token Number (e.g. DS-AP-2026-000124) into the Track Application portal to view live horizontal stepper status and the assigned Tahsildar.',
    },
    {
      q: 'What happens if the AI flags an area discrepancy between my Sale Deed and GIS Survey?',
      a: 'The Tahsildar will review the cadastral survey boundaries on the satellite map, inspect the field report, and can legally reconcile the discrepancy or order a differential GPS resurvey before endorsing final approval.',
    },
    {
      q: 'Is an Aadhaar OTP required for all services?',
      a: 'Yes, to prevent identity fraud, statutory title mutations and sale deed registrations require Aadhaar-linked OTP verification.',
    },
    {
      q: 'Can I download certified Record of Rights (RoR 1B) online?',
      a: 'Yes, certified digital copies bearing an encrypted government QR code and digital signature can be instantly downloaded under the Certificates service.',
    },
  ];

  const translatedFaqs = t('contact.faqs', { returnObjects: true }) as Array<{ q: string; a: string }> | undefined;
  const faqs = Array.isArray(translatedFaqs) && translatedFaqs.length > 0 ? translatedFaqs : defaultFaqs;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-3 shadow-xs">
            <Shield size={14} className="text-emerald-600" />
            <span>{t('contact.badge', '24x7 Citizen Support & Statutory Revenue Grievance Helpdesk')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t('contact.title', 'How Can We Assist You?')}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            {t('contact.subtitle', 'Contact your local Tahsildar office, state nodal helpdesk, or submit a formal inquiry to the National Land Governance Public Infrastructure Team.')}
          </p>
        </div>

        {/* 4 State Helplines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stateHelplines.map((h) => (
            <div
              key={h.code}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {h.code} {t('admin.managedStates', 'State')}
                  </span>
                  <Phone size={16} className="text-emerald-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{h.state}</h3>
                <p className="text-lg font-black font-mono text-emerald-700 mt-1">{h.helpline}</p>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                  <Mail size={13} className="text-slate-400" />
                  <span className="truncate">{h.email}</span>
                </p>
                <p className="text-xs text-slate-600 mt-2 leading-tight">
                  <strong className="text-slate-800">{t('contact.nodalOffice', 'Nodal Office')}:</strong> {h.office}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] text-slate-500">
                <Clock size={12} className="text-slate-400" />
                <span>{h.hours}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form & FAQs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <MessageSquare size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">{t('contact.sendInquiryTitle', 'Send an Inquiry or Grievance')}</h2>
                <p className="text-xs text-slate-500">{t('contact.sendInquirySubtitle', 'Tickets are directly monitored by the District Collectorate')}</p>
              </div>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 size={48} className="text-emerald-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-emerald-950">{t('contact.ticketCreated', 'Grievance Ticket Created')}</h3>
                <p className="text-xs sm:text-sm text-emerald-800 mt-1 max-w-md mx-auto">
                  {t('contact.ticketAssigned', 'Your inquiry has been assigned Ticket ID #GRV-2026-8942. A nodal revenue officer will respond within 48 business hours.')}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  {t('contact.submitAnother', 'Submit Another Inquiry')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="gov-label">{t('contact.fullName', 'Your Full Name *')}</label>
                    <input
                      className="gov-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('contact.fullNamePlaceholder', 'e.g. Ravi Kumar')}
                      required
                    />
                  </div>
                  <div>
                    <label className="gov-label">{t('contact.emailAddress', 'Email Address *')}</label>
                    <input
                      className="gov-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('contact.emailPlaceholder', 'citizen@example.com')}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="gov-label">{t('contact.mobileNumber', 'Mobile Number')}</label>
                    <input
                      className="gov-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t('contact.mobilePlaceholder', '10-digit mobile number')}
                    />
                  </div>
                  <div>
                    <label className="gov-label">{t('contact.jurisdictionState', 'Jurisdiction State *')}</label>
                    <select
                      className="gov-input"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="AP">{t('contact.states.AP.name', 'Andhra Pradesh')}</option>
                      <option value="TS">{t('contact.states.TS.name', 'Telangana')}</option>
                      <option value="TN">{t('contact.states.TN.name', 'Tamil Nadu')}</option>
                      <option value="CH">{t('contact.states.CH.name', 'Chandigarh')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="gov-label">{t('contact.subject', 'Subject / Issue Type *')}</label>
                  <input
                    className="gov-input"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={t('contact.subjectPlaceholder', 'e.g. Land Boundary Survey Delay or Document Upload Error')}
                    required
                  />
                </div>

                <div>
                  <label className="gov-label">{t('contact.description', 'Description / Survey Details *')}</label>
                  <textarea
                    className="gov-input min-h-[120px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('contact.descriptionPlaceholder', 'Please specify Survey Number, Village, Mandal, and nature of the issue...')}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  <span>{t('contact.submitButton', 'Submit Statutory Grievance')}</span>
                </button>
              </form>
            )}
          </div>

          {/* FAQs Accordion (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle size={20} className="text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">{t('contact.faqsTitle', 'Frequently Asked Questions')}</h3>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="border border-slate-200/70 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-800 hover:text-emerald-700 flex items-center justify-between gap-3 bg-slate-50/50"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={16}
                        className={`text-slate-400 transition-transform ${openFaq === i ? 'rotate-180 text-emerald-600' : ''}`}
                      />
                    </button>
                    {openFaq === i && (
                      <div className="p-4 text-xs text-slate-600 bg-white border-t border-slate-100 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* National Toll-Free Box */}
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 shadow-md">
              <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                {t('contact.tollFreeBadge', 'National Toll-Free Control Room')}
              </h4>
              <p className="text-2xl font-black font-mono mt-1 text-white">
                {t('contact.tollFreeNumber', '1800-DHARANI-SETU')}
              </p>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {t('contact.tollFreeDesc', 'Integrated Digital Public Infrastructure for Land Governance. Dedicated team for multi-state cadastral queries and citizen grievances.')}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
