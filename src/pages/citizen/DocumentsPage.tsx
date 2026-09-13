import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { TahsildarLandOwnershipCertificateModal } from '../../components/documents/TahsildarLandOwnershipCertificateModal';
import { DocumentInspectionModal } from '../../components/documents/DocumentInspectionModal';
import { formatDate } from '../../utils';
import {
  FolderOpen, FileText, Download, ShieldCheck, Clock,
  AlertCircle, CheckCircle2, UploadCloud, Eye, Award
} from 'lucide-react';
import type { Application, Document } from '../../types';

export function DocumentsPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { getApplicationsForCitizen, getDocuments } = useAppStore();

  const [activeTab, setActiveTab] = useState<'all' | 'verified' | 'pending'>('all');
  const [selectedAppForCert, setSelectedAppForCert] = useState<Application | null>(null);
  const [inspectingDoc, setInspectingDoc] = useState<{ doc: Document; app?: Application } | null>(null);

  const apps = user ? getApplicationsForCitizen(user.id) : [];
  const allDocs = apps.flatMap(app => {
    const docs = getDocuments(app.id);
    return docs.map(d => ({
      ...d,
      tokenNumber: app.tokenNumber,
      serviceName: app.serviceName,
      appRef: app,
    }));
  });

  const filteredDocs = allDocs.filter(doc => {
    if (activeTab === 'verified') return doc.status === 'verified';
    if (activeTab === 'pending') return doc.status === 'pending';
    return true;
  });

  return (
    <PageLayout role="citizen">
      <DemoBanner />
      <PageHeader
        title={t('nav.documents')}
        subtitle={t('docVault.subtitle', 'Digital document vault and verification ledger for land transactions')}
        breadcrumb={[{ label: t('nav.home', 'Home') }, { label: t('nav.documents') }]}
      />

      <PageContent>
        {/* Document Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="gov-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <FolderOpen size={20} />
            </div>
            <div>
              <p className="text-xs text-brand-muted">{t('docVault.totalDocs', 'Total Documents')}</p>
              <p className="text-lg font-bold text-brand-navy">{allDocs.length}</p>
            </div>
          </div>

          <div className="gov-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-xs text-brand-muted">{t('docVault.verifiedOfficer', 'Verified by Officer')}</p>
              <p className="text-lg font-bold text-emerald-700">
                {allDocs.filter(d => d.status === 'verified').length}
              </p>
            </div>
          </div>

          <div className="gov-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-brand-muted">{t('docVault.pendingVerification', 'Pending Verification')}</p>
              <p className="text-lg font-bold text-amber-700">
                {allDocs.filter(d => d.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex bg-white border border-gov-border rounded-lg p-1 text-xs max-w-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-1.5 rounded text-center transition-colors font-medium ${
              activeTab === 'all' ? 'bg-brand-navy text-white' : 'text-gray-600 hover:text-brand-navy'
            }`}
          >
            {t('docVault.allTab', 'All')} ({allDocs.length})
          </button>
          <button
            onClick={() => setActiveTab('verified')}
            className={`flex-1 py-1.5 rounded text-center transition-colors font-medium ${
              activeTab === 'verified' ? 'bg-brand-navy text-white' : 'text-gray-600 hover:text-brand-navy'
            }`}
          >
            {t('docVault.verifiedTab', 'Verified')} ({allDocs.filter(d => d.status === 'verified').length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-1.5 rounded text-center transition-colors font-medium ${
              activeTab === 'pending' ? 'bg-brand-navy text-white' : 'text-gray-600 hover:text-brand-navy'
            }`}
          >
            {t('docVault.pendingTab', 'Pending')} ({allDocs.filter(d => d.status === 'pending').length})
          </button>
        </div>

        {/* Documents Table / Grid */}
        {filteredDocs.length === 0 ? (
          <div className="gov-card text-center py-12">
            <FolderOpen size={36} className="text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-brand-navy">{t('docVault.noDocs', 'No documents found')}</p>
            <p className="text-xs text-brand-muted mt-1">
              {t('docVault.noDocsDesc', 'Documents attached when submitting service applications will appear here.')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredDocs.map(doc => (
              <div
                key={doc.id}
                className="gov-card flex items-start justify-between gap-3 border hover:border-brand-navy transition-all"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-brand-navy mt-0.5">
                    <FileText size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-brand-navy truncate">{doc.name}</p>
                    <p className="text-[11px] text-gray-500 truncate">{doc.fileName}</p>
                    <p className="text-[10px] text-brand-muted mt-1">
                      {t('docVault.refToken', 'Ref Token:')} <strong className="font-mono text-gray-700">{doc.tokenNumber}</strong>
                    </p>
                    <p className="text-[10px] text-brand-muted">
                      {t('docVault.uploadedOn', 'Uploaded on:')} {formatDate(doc.uploadedAt)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      doc.status === 'verified'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : doc.status === 'rejected'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {t(`status.${doc.status}`, doc.status.toUpperCase())}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {(() => {
                      const isCertDoc = doc.docType === 'CERTIFICATE' || doc.id.includes('CERT');
                      const isGrievanceApp = doc.appRef?.serviceType === 'grievance';
                      const stages = doc.appRef?.workflowStages || [];
                      const isAllApproved = (doc.appRef?.status === 'COMPLETED' || doc.appRef?.status === 'APPROVED') &&
                        stages.length > 0 &&
                        stages.every(s => s.status === 'APPROVED');

                      const canViewCertificate = isCertDoc && isGrievanceApp && isAllApproved;

                      if (!canViewCertificate) {
                        return (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setInspectingDoc({ doc, app: doc.appRef })}
                              className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                              title="Open & Inspect Document"
                            >
                              <Eye size={12} />
                              <span>View</span>
                            </button>
                            <button
                              onClick={() => {
                                if (doc.fileData) {
                                  const a = document.createElement('a');
                                  a.href = doc.fileData;
                                  a.download = doc.fileName;
                                  a.click();
                                } else {
                                  alert(`Downloading statutory deed record: ${doc.fileName}`);
                                }
                              }}
                              className="p-1.5 rounded hover:bg-brand-light text-brand-navy transition-colors"
                              title="Download document"
                            >
                              <Download size={14} />
                            </button>
                          </div>
                        );
                      }

                      return (
                        <>
                          <button
                            onClick={() => setSelectedAppForCert(doc.appRef)}
                            className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 transition-colors shadow-2xs"
                            title="View Official Tahsildar Order"
                          >
                            <Eye size={12} />
                            <span>View Proof</span>
                          </button>
                          <button
                            onClick={() => setSelectedAppForCert(doc.appRef)}
                            className="p-1.5 rounded hover:bg-brand-light text-brand-navy transition-colors"
                            title="Download official order"
                          >
                            <Download size={14} />
                          </button>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tahsildar Official Land Ownership Document Modal */}
        {selectedAppForCert && (
          <TahsildarLandOwnershipCertificateModal
            application={selectedAppForCert}
            isOpen={!!selectedAppForCert}
            onClose={() => setSelectedAppForCert(null)}
          />
        )}

        {/* Document Inspection Modal (Citizen Read-Only View) */}
        {inspectingDoc && (
          <DocumentInspectionModal
            document={inspectingDoc.doc}
            application={inspectingDoc.app}
            isOpen={!!inspectingDoc}
            onClose={() => setInspectingDoc(null)}
            readOnly={true}
          />
        )}
      </PageContent>
    </PageLayout>
  );
}
