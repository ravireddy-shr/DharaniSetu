import { DedicatedServiceApp, type CustomField } from './DedicatedServiceApp';
import { FileText } from 'lucide-react';

export function RegistrationApplicationPage() {
  const fields: CustomField[] = [
    { name: 'deedType', label: 'Deed Category', type: 'select', options: ['Absolute Sale Deed', 'Gift Deed', 'Settlement Deed', 'Partition Deed'], required: true, defaultValue: 'Absolute Sale Deed' },
    { name: 'buyerName', label: 'Transferee / Purchaser Name', type: 'text', placeholder: 'Full legal name of buyer', required: true, defaultValue: 'Ravi Kumar Reddy' },
    { name: 'sellerName', label: 'Transferor / Seller Name', type: 'text', placeholder: 'Full legal name of seller', required: true, defaultValue: 'Padmavathi Konduri' },
    { name: 'saleValue', label: 'Declared Market Value / Consideration (₹)', type: 'number', placeholder: 'e.g. 4500000', required: true, defaultValue: '4500000' },
    { name: 'deedArea', label: 'Extent Transferred in Deed (Acres)', type: 'number', placeholder: 'e.g. 1.20', required: true, defaultValue: '1.20' },
    { name: 'stampDutyChallan', label: 'e-Challan / Stamp Duty Number', type: 'text', placeholder: 'e.g. CHN-2026-AP-998812', required: true, defaultValue: 'CHN-2026-AP-998812' },
    { name: 'encumbranceCertNo', label: 'Encumbrance Certificate (EC) Number', type: 'text', placeholder: 'e.g. EC-GNT-2026-00441', required: true, defaultValue: 'EC-GNT-2026-00441' },
    { name: 'witnessNames', label: 'Attesting Witnesses (Two)', type: 'text', placeholder: 'e.g. K. Murthy & B. Naidu', required: true, defaultValue: 'K. Murthy & B. Naidu' },
    { name: 'purpose', label: 'Transaction Summary & Background', type: 'textarea', placeholder: 'Provide legal rationale and boundary schedule...', required: true, defaultValue: 'Direct outright purchase of land parcel free of encumbrance.' },
  ];

  return (
    <DedicatedServiceApp
      serviceId="SVC-001"
      serviceType="land_registration"
      title="Land Registration & Deed Execution"
      category="Registration"
      slaDays={15}
      description="Formal statutory execution of title deeds, stamp duty assessment, and digital registry deed recording."
      icon={<FileText size={24} />}
      requiredDocs={['Sale Deed Draft', 'Identity Proof (Aadhaar/PAN)', 'Encumbrance Certificate (EC)', 'Pattadar Passbook']}
      customFields={fields}
    />
  );
}
