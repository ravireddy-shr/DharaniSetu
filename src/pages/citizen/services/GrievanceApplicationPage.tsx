import { DedicatedServiceApp, type CustomField } from './DedicatedServiceApp';
import { AlertTriangle } from 'lucide-react';

export function GrievanceApplicationPage() {
  const fields: CustomField[] = [
    { name: 'grievanceCategory', label: 'Grievance Nature', type: 'select', options: ['Illegal Encroachment on Land', 'Duplicate / Fraudulent Passbook Issue', 'Unlawful Revenue Entry / Clerical Error', 'Delay in Statutory Service Delivery', 'Tampering of Cadastral Boundaries'], required: true, defaultValue: 'Illegal Encroachment on Land' },
    { name: 'respondentDetails', label: 'Opposite Party / Encroacher Details (if known)', type: 'text', placeholder: 'Name, address, and mobile number', required: true, defaultValue: 'Unknown unauthorized occupants claiming adjacent survey' },
    { name: 'policeComplaintNo', label: 'Police / FIR Number (if registered)', type: 'text', placeholder: 'e.g. FIR No. 112/2026, Pedakakani PS', defaultValue: 'FIR No. 112/2026' },
    { name: 'disputedExtent', label: 'Extent Subject to Grievance (Acres or Sq.Yd)', type: 'text', placeholder: 'e.g. 0.25 Acres', required: true, defaultValue: '0.25 Acres' },
    { name: 'purpose', label: 'Comprehensive Chronology of Facts & Prayer', type: 'textarea', placeholder: 'State full facts, past representations, and requested statutory action from Tahsildar / Collector...', required: true, defaultValue: 'Unauthorized obstruction created on registered title boundary. Immediate physical inspection and eviction order requested under Section 7 of Land Encroachment Act.' },
  ];

  return (
    <DedicatedServiceApp
      serviceId="SVC-006"
      serviceType="grievance"
      title="Land Grievance & Dispute Redressal"
      category="Revenue"
      slaDays={30}
      description="Formal statutory complaint mechanism monitored directly by the District Collector and Tahsildar."
      icon={<AlertTriangle size={24} />}
      requiredDocs={['Title Documents / Passbook', 'Photographic Evidence of Encroachment', 'Previous Representations / Police Complaints', 'Aadhaar ID Proof']}
      customFields={fields}
    />
  );
}
