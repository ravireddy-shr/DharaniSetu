import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../utils';
import {
  ShieldCheck, Printer, Download, X, CheckCircle2,
  Building2, MapPin, QrCode, FileText, Landmark
} from 'lucide-react';
import type { Application } from '../../types';

interface CertificateModalProps {
  application: Application;
  isOpen: boolean;
  onClose: () => void;
}

export function TahsildarLandOwnershipCertificateModal({ application, isOpen, onClose }: CertificateModalProps) {
  const { t } = useTranslation();
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const extentAcres = application.aiDiscrepancy?.deedArea || (application.formData?.deedArea ? parseFloat(application.formData.deedArea) : 2.40);
  const extentSqft = Math.round(extentAcres * 43560).toLocaleString('en-IN');
  const passbookNo = application.formData?.passbookNumber || 'PB-2026-88129';
  const aadhaarMasked = application.formData?.aadhaar || 'XXXX-XXXX-4821';
  const issueDate = formatDate(application.updatedAt || application.submittedAt);
  const officerName = application.assignedOfficerName || 'S. Lakshmi Narayana';

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white">
      {/* Container card */}
      <div className="bg-white rounded-3xl border border-slate-300 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
        {/* Top Action Bar (hidden on print) */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-400" />
            <span className="text-xs sm:text-sm font-bold tracking-wide">
              Official Statutory Land Ownership Document
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Printer size={14} />
              <span>Print Official Order</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Certificate Printable Content */}
        <div ref={printRef} className="p-6 sm:p-10 overflow-y-auto font-serif text-slate-900 bg-[#fdfdfb] print:p-8">
          
          {/* Certificate Border Frame */}
          <div className="border-4 border-double border-emerald-900/80 p-6 sm:p-8 rounded-2xl relative bg-white shadow-xs">
            
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
              <span className="text-8xl font-black uppercase text-slate-900 transform -rotate-45">
                DHARANISETU
              </span>
            </div>

            {/* Header / National Emblem Bar */}
            <div className="text-center border-b-2 border-slate-300 pb-5 mb-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <img
                  src="/logo.png"
                  alt="Emblem"
                  className="w-12 h-12 rounded-full border border-emerald-800 object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-widest text-slate-900 uppercase font-sans">
                    Government of {application.stateName || 'Andhra Pradesh'}
                  </h3>
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-sans">
                    Revenue & Land Administration Department · DharaniSetu DPI
                  </p>
                </div>
              </div>
              <p className="text-xs font-semibold text-slate-700 uppercase font-sans">
                Office of the Tahsildar & Executive Magistrate, {application.mandalName} Mandal, {application.districtName} District
              </p>
            </div>

            {/* Document Title Banner */}
            <div className="text-center mb-6">
              <div className="inline-block bg-emerald-900 text-white px-6 py-2 rounded-lg shadow-xs">
                <h1 className="text-sm sm:text-base font-black uppercase tracking-wider font-sans">
                  Certificate of Land Ownership & Dispute Clearance Order
                </h1>
              </div>
              <p className="text-[11px] text-slate-600 mt-2 font-sans italic">
                (Issued pursuant to Statutory Magisterial Adjudication under Section 5 of the Record of Rights Act & Land Governance Protocol)
              </p>
            </div>

            {/* Order Reference Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-sans mb-6">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Decree / Order No:</span>
                <span className="font-mono font-bold text-slate-900">DS-ROR-MAG/{application.tokenNumber.slice(-6)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Case Token Ref:</span>
                <span className="font-mono font-bold text-emerald-800">{application.tokenNumber}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Date of Order:</span>
                <span className="font-semibold text-slate-900">{issueDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Title Status:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Clear & Certified
                </span>
              </div>
            </div>

            {/* Section I: Landholder Particulars */}
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 font-sans border-b border-emerald-200 pb-1 mb-2.5 flex items-center gap-1.5">
                <span>1. Particulars of Certified Landholder / Owner</span>
              </h4>
              <table className="w-full text-xs font-sans border-collapse">
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-1.5 text-slate-500 w-1/3 font-medium">Name of Registered Owner:</td>
                    <td className="py-1.5 font-bold text-slate-900">{application.citizenName}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-1.5 text-slate-500 font-medium">Pattadar Passbook / Khata No:</td>
                    <td className="py-1.5 font-mono font-bold text-slate-900">{passbookNo}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-1.5 text-slate-500 font-medium">Aadhaar (Cryptographically Masked):</td>
                    <td className="py-1.5 font-mono text-slate-800">{aadhaarMasked}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-500 font-medium">Resident Mandal & District:</td>
                    <td className="py-1.5 text-slate-800">{application.mandalName}, {application.districtName} ({application.stateName})</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Section II: Land Parcel Schedule */}
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 font-sans border-b border-emerald-200 pb-1 mb-2.5 flex items-center gap-1.5">
                <span>2. Schedule of Immovable Land Property</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-emerald-50/40 rounded-xl border border-emerald-100 text-xs font-sans mb-3">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Survey & Sub-div No:</span>
                  <span className="font-mono font-black text-emerald-900 text-sm">{application.surveyNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Total Extent / Area:</span>
                  <span className="font-bold text-slate-900">{extentAcres} Acres <span className="text-[10px] text-slate-500">({extentSqft} sq.ft)</span></span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Classification:</span>
                  <span className="font-semibold text-slate-800">Patta Dry Land (Agricultural)</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Village:</span>
                  <span className="font-semibold text-slate-800">{application.village}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Mandal:</span>
                  <span className="font-semibold text-slate-800">{application.mandalName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">District & State:</span>
                  <span className="font-semibold text-slate-800">{application.districtName}, {application.stateName}</span>
                </div>
              </div>

              {/* Boundaries Table */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-sans">
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  Four Statutory Boundaries (Chattuseema):
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div><strong className="text-emerald-900">North:</strong> Adjacent Survey Land & Irrigation Channel</div>
                  <div><strong className="text-emerald-900">South:</strong> 30ft Village Panchayat Road Access</div>
                  <div><strong className="text-emerald-900">East:</strong> Registered Private Agricultural Holding</div>
                  <div><strong className="text-emerald-900">West:</strong> Permanent Cadastral Demarcation Stone</div>
                </div>
              </div>
            </div>

            {/* Section III: Magisterial Adjudication & Conclusive Ownership Declaration */}
            <div className="mb-6 p-4 rounded-xl bg-slate-50/80 border-l-4 border-l-emerald-800 border-y border-r border-slate-200 text-xs leading-relaxed">
              <p className="font-bold text-slate-900 mb-1 font-sans">
                STATUTORY DECLARATION & MAGISTERIAL ORDER OF OWNERSHIP:
              </p>
              <p className="text-slate-800 text-[11px] mb-2 leading-relaxed">
                WHEREAS an application for Land Grievance and Dispute Resolution under Reference <strong>{application.tokenNumber}</strong> was examined by the Village Revenue Officer (VRO) and field survey demarcated by the Cadastral Survey Officer;
              </p>
              <p className="text-slate-800 text-[11px] mb-2 leading-relaxed">
                AND WHEREAS summary magisterial inquiry confirms that all boundary disputes, encroaching claims, and revenue ledger discrepancies concerning Survey No. <strong>{application.surveyNumber}</strong> stand completely adjudicated and settled;
              </p>
              <p className="font-bold text-emerald-950 text-[11px] leading-relaxed">
                IT IS HEREBY ORDERED AND CERTIFIED that <strong>{application.citizenName}</strong> holds absolute, unencumbered, and undisputed title and peaceful possession over the said land parcel. THIS DOCUMENT SHALL CONSTITUTE CONCLUSIVE PROOF OF TITLE AND EVIDENCE BEFORE COURTS OF LAW, SUB-REGISTRAR OFFICES, AND FINANCIAL INSTITUTIONS.
              </p>
            </div>

            {/* Section IV: Digital Signatures, QR Code & Seals */}
            <div className="pt-4 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
              {/* QR Verification Box */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-14 h-14 bg-white border border-slate-300 rounded-lg flex items-center justify-center p-1">
                  <QrCode size={46} className="text-slate-800" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Scan to Verify</span>
                  <p className="text-[11px] font-bold text-emerald-900">dharanisetu.gov.in/verify</p>
                  <p className="text-[9px] font-mono text-slate-500">Hash: {application.tokenNumber.slice(-8)}-CERT-OK</p>
                </div>
              </div>

              {/* Tahsildar Official Digital Signature Box */}
              <div className="text-right p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 min-w-[240px]">
                <div className="flex items-center justify-end gap-1 text-emerald-800 font-bold text-[11px] mb-1">
                  <ShieldCheck size={14} className="text-emerald-700" />
                  <span>Digitally Signed & Certified</span>
                </div>
                <p className="font-black text-xs text-slate-900">
                  {officerName}
                </p>
                <p className="text-[11px] font-semibold text-slate-700">
                  Tahsildar & Executive Magistrate
                </p>
                <p className="text-[10px] text-slate-500">
                  {application.mandalName} Mandal, {application.districtName}
                </p>
                <p className="text-[9px] font-mono text-emerald-800 mt-1">
                  Class-3 DSC Verified · {issueDate}
                </p>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="mt-5 pt-3 border-t border-slate-200 text-center text-[9px] text-slate-400 font-sans">
              This is a digitally generated statutory order issued under Digital Public Infrastructure (DPI) protocols of the Government of India and State Land Administration. Valid without physical handwritten signature.
            </div>

          </div>
        </div>

        {/* Modal Bottom Footer (hidden on print) */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-600 print:hidden">
          <span>Valid nationwide as legal proof of ownership & dispute clearance</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
