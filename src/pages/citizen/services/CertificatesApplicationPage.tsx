import { DedicatedServiceApp, type CustomField } from './DedicatedServiceApp';
import { FileSearch } from 'lucide-react';

export function CertificatesApplicationPage() {
  const fields: CustomField[] = [
    { name: 'certificateType', label: 'Certificate Required', type: 'select', options: ['Record of Rights (RoR 1B Certified Copy)', 'Encumbrance Certificate (EC - 30 Years)', 'Land Title Verification Certificate', 'Certified Village Map (FMB Extract)'], required: true, defaultValue: 'Record of Rights (RoR 1B Certified Copy)' },
    { name: 'certificatePurpose', label: 'Statutory Purpose', type: 'select', options: ['Bank Agriculture / Housing Loan', 'Court Proceeding / Legal Evidence', 'Property Transaction / Sale Verification', 'Personal Record Keeping'], required: true, defaultValue: 'Bank Agriculture / Housing Loan' },
    { name: 'bankName', label: 'Institution / Bank Name (if loan)', type: 'text', placeholder: 'e.g. State Bank of India, Main Branch', defaultValue: 'State Bank of India' },
    { name: 'deliveryMode', label: 'Delivery & Signing Format', type: 'select', options: ['Instant Digitally Signed PDF (e-Seal)', 'Physical Stamped Copy via Speed Post', 'Both Digital and Postal'], required: true, defaultValue: 'Instant Digitally Signed PDF (e-Seal)' },
    { name: 'purpose', label: 'Application Notes & Khata Cross-Reference', type: 'textarea', placeholder: 'Any specific instructions or past loan references...', required: true, defaultValue: 'Immediate digitally signed certified copy of RoR 1B requested for submission to bank loan sanctioning committee.' },
  ];

  return (
    <DedicatedServiceApp
      serviceId="SVC-008"
      serviceType="land_record_request"
      title="Certificates (RoR 1B / EC / Title)"
      category="Revenue"
      slaDays={3}
      description="Download tamper-proof, digitally signed statutory land ownership and non-encumbrance certificates."
      icon={<FileSearch size={24} />}
      requiredDocs={['Pattadar Passbook / Khata Details', 'Identity Proof (Aadhaar / Voter ID)']}
      customFields={fields}
    />
  );
}
