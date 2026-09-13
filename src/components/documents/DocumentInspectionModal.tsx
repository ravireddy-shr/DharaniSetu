import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../utils';
import {
  FileText, X, Download, CheckCircle2, XCircle, Eye,
  ShieldCheck, AlertTriangle, Building, MapPin, ExternalLink,
  ZoomIn, ZoomOut, RotateCw
} from 'lucide-react';
import type { Document, Application } from '../../types';

interface DocumentInspectionModalProps {
  document: Document | null;
  application?: Application;
  isOpen: boolean;
  onClose: () => void;
  onVerify?: (docId: string) => void;
  onReject?: (docId: string, reason?: string) => void;
  readOnly?: boolean;
}

export function DocumentInspectionModal({
  document,
  application,
  isOpen,
  onClose,
  onVerify,
  onReject,
  readOnly = false,
}: DocumentInspectionModalProps) {
  const { t } = useTranslation();
  const [rejectMode, setRejectMode] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  if (!isOpen || !document) return null;

  const isImage = document.mimeType?.startsWith('image/') ||
    /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(document.fileName);
  const isPdf = document.mimeType === 'application/pdf' ||
    /\.pdf$/i.test(document.fileName);

  const handleVerify = () => {
    if (onVerify) {
      onVerify(document.id);
      onClose();
    }
  };

  const handleRejectSubmit = () => {
    if (onReject) {
      onReject(document.id, rejectReason || 'Document verification failed statutory criteria.');
      setRejectMode(false);
      setRejectReason('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      {/* Container Dialog */}
      <div className="bg-white rounded-3xl border border-slate-300 shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col h-[92vh] max-h-[900px]">
        
        {/* Top Header Bar */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between gap-3 flex-shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <FileText size={20} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {document.id}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  document.status === 'verified'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : document.status === 'rejected'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  {document.status.toUpperCase()}
                </span>
                {application && (
                  <span className="text-slate-400 text-xs hidden sm:inline">
                    · Token: <strong className="text-white font-mono">{application.tokenNumber}</strong>
                  </span>
                )}
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white truncate mt-0.5">
                {document.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Zoom Controls for inspection */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-800 rounded-xl p-1 border border-slate-700 text-slate-300 text-xs">
              <button
                onClick={() => setZoom(prev => Math.max(50, prev - 25))}
                className="p-1.5 hover:bg-slate-700 rounded-lg hover:text-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={15} />
              </button>
              <span className="px-1.5 font-mono text-[11px] font-semibold">{zoom}%</span>
              <button
                onClick={() => setZoom(prev => Math.min(200, prev + 25))}
                className="p-1.5 hover:bg-slate-700 rounded-lg hover:text-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={15} />
              </button>
              <button
                onClick={() => setRotation(prev => (prev + 90) % 360)}
                className="p-1.5 hover:bg-slate-700 rounded-lg hover:text-white transition-colors ml-1 border-l border-slate-700 pl-2"
                title="Rotate 90deg"
              >
                <RotateCw size={15} />
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Middle Main Content: Split Viewer + Statutory Meta */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden bg-slate-100">
          
          {/* Document Preview Pane */}
          <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center relative select-none">
            {document.fileData ? (
              isImage ? (
                <div
                  className="transition-transform duration-200 ease-out origin-center max-w-full flex items-center justify-center shadow-lg rounded-xl overflow-hidden bg-white"
                  style={{
                    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                  }}
                >
                  <img
                    src={document.fileData}
                    alt={document.name}
                    className="max-h-[65vh] object-contain rounded-xl"
                  />
                </div>
              ) : isPdf ? (
                <div
                  className="w-full h-full min-h-[500px] bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200"
                  style={{ transform: `scale(${zoom / 100})` }}
                >
                  <iframe
                    src={document.fileData}
                    title={document.name}
                    className="w-full h-full border-none"
                  />
                </div>
              ) : (
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md text-center max-w-md">
                  <FileText size={48} className="text-slate-400 mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-800">{document.fileName}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    MIME Type: {document.mimeType || 'Binary Document'} · {(document.fileSize / 1024).toFixed(1)} KB
                  </p>
                  <a
                    href={document.fileData}
                    download={document.fileName}
                    className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <Download size={14} />
                    <span>Download Raw File</span>
                  </a>
                </div>
              )
            ) : (
              /* High-Fidelity Synthetic Statutory Deed Viewer for Demo/Uploaded files without binary */
              <div
                className="bg-white border border-slate-300 rounded-2xl shadow-xl p-6 sm:p-8 max-w-2xl w-full text-slate-800 font-serif leading-relaxed transition-transform duration-200 origin-top"
                style={{
                  transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                }}
              >
                {/* Simulated Statutory Stamp Header */}
                <div className="border-4 border-double border-amber-800/60 p-4 rounded-xl bg-amber-50/40 text-center mb-6">
                  <div className="flex items-center justify-center gap-2 text-amber-900 font-sans font-black text-xs uppercase tracking-widest">
                    <span>Government of India · Registration & Stamps Department</span>
                  </div>
                  <h3 className="font-sans font-black text-lg text-slate-900 uppercase mt-1 tracking-wider">
                    {document.name}
                  </h3>
                  <div className="flex items-center justify-center gap-4 text-slate-600 font-sans text-xs mt-1">
                    <span>Document Ref: <strong>{document.fileName}</strong></span>
                    <span>•</span>
                    <span>File Size: <strong>{(document.fileSize / 1024).toFixed(1)} KB</strong></span>
                  </div>
                </div>

                {/* Simulated Deed Legal Content */}
                <div className="space-y-4 text-xs text-slate-700 text-justify">
                  <p>
                    <strong>THIS STATUTORY INSTRUMENT</strong> is placed on statutory record before the competent revenue and registration authorities in the matter of application <strong>{application?.tokenNumber || 'DS-2026-SUBMISSION'}</strong>, for Land Parcel Survey No. <strong>{application?.surveyNumber || '124/3A'}</strong>, situated in <strong>{application?.village || 'Jurisdictional Village'}</strong>, Mandal <strong>{application?.mandalName || 'Mandal Division'}</strong>, District <strong>{application?.districtName || 'District'}</strong>.
                  </p>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-sans text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Recorded Applicant / Executant:</span>
                      <strong className="text-slate-900">{application?.citizenName || 'Applicant Citizen'}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Landholding Extent:</span>
                      <strong className="text-emerald-800">
                        {application?.aiDiscrepancy?.deedArea || application?.formData?.deedArea || '2.40'} Acres ({Math.round((application?.aiDiscrepancy?.deedArea || 2.40) * 43560).toLocaleString('en-IN')} sq.ft)
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Submission Timestamp:</span>
                      <span className="font-mono text-slate-700">{formatDate(document.uploadedAt)}</span>
                    </div>
                  </div>

                  <p>
                    The executant hereby attests and solemnly declares that the scheduled landed property is free from encumbrances, attachments, lis pendens, or adverse civil proceedings, and all boundary stones conform to the settlement maps.
                  </p>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] font-sans text-slate-500">
                    <div>
                      <span className="block font-bold text-slate-800">Verified Citizen Signature</span>
                      <span>Digital Public Infrastructure (UIDAI e-Sign Verified)</span>
                    </div>
                    <div className="w-16 h-16 border-2 border-emerald-600/40 rounded-lg flex flex-col items-center justify-center text-center p-1 bg-emerald-50 text-emerald-800 text-[9px] font-bold">
                      <ShieldCheck size={18} className="text-emerald-700" />
                      <span>OFFICIAL SEAL</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Statutory Verification Review Checklist & Actions */}
          <div className="w-full md:w-80 bg-white border-t md:border-t-0 md:border-l border-slate-200/90 flex flex-col justify-between p-5 flex-shrink-0">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Document Particulars
                </span>
                <p className="text-xs font-bold text-slate-900 mt-1">{document.name}</p>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5 truncate">{document.fileName}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Size: {(document.fileSize / 1024).toFixed(1)} KB</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Uploaded: {formatDate(document.uploadedAt)}</p>
              </div>

              {/* Scrutiny Checklist */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Officer Scrutiny Protocol
                </span>
                <label className="flex items-start gap-2 text-slate-700 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-0.5 rounded text-emerald-600" />
                  <span className="text-[11px] leading-tight">Document legibility, seal & signature verified</span>
                </label>
                <label className="flex items-start gap-2 text-slate-700 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-0.5 rounded text-emerald-600" />
                  <span className="text-[11px] leading-tight">Survey number matches land schedule</span>
                </label>
                <label className="flex items-start gap-2 text-slate-700 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-0.5 rounded text-emerald-600" />
                  <span className="text-[11px] leading-tight">Identity of executant / applicant confirmed</span>
                </label>
              </div>

              {rejectMode && (
                <div className="space-y-2 animate-in fade-in duration-150">
                  <label className="text-xs font-bold text-rose-800 block">
                    Reason for Rejection *
                  </label>
                  <textarea
                    value={rejectReason}
                    onChange={e => setRejectReason(e.target.value)}
                    placeholder="e.g. Illegible stamp seal, missing boundary schedule, or mismatched survey number."
                    className="w-full h-20 text-xs p-2.5 rounded-xl border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-rose-50/40 text-slate-800"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons: Decision directly based on the opened document */}
            {!readOnly && (
              <div className="pt-4 border-t border-slate-100 space-y-2">
                {!rejectMode ? (
                  <>
                    <button
                      onClick={handleVerify}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 size={16} />
                      <span>Verify & Accept Document</span>
                    </button>

                    <button
                      onClick={() => setRejectMode(true)}
                      className="w-full py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <XCircle size={16} />
                      <span>Reject Document</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleRejectSubmit}
                      className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <XCircle size={16} />
                      <span>Confirm Document Rejection</span>
                    </button>

                    <button
                      onClick={() => {
                        setRejectMode(false);
                        setRejectReason('');
                      }}
                      className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
