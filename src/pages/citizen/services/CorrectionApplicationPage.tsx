import { DedicatedServiceApp, type CustomField } from './DedicatedServiceApp';
import { Edit3 } from 'lucide-react';

export function CorrectionApplicationPage() {
  const fields: CustomField[] = [
    { name: 'errorType', label: 'Clerical Error Category', type: 'select', options: ['Pattadar Name Spelling Mismatch', 'Father / Husband Name Typo', 'Survey Number Typo (Sub-division missing)', 'Acreage / Extent Discrepancy on Portal', 'Land Classification Mismatch'], required: true, defaultValue: 'Acreage / Extent Discrepancy on Portal' },
    { name: 'erroneousEntry', label: 'Incorrect Value Displayed Currently on Portal', type: 'text', placeholder: 'e.g. Area shows 0.90 Acres instead of 1.00 Acres', required: true, defaultValue: 'Area shows 0.90 Acres instead of 1.00 Acres' },
    { name: 'correctEntry', label: 'Correct Value as per Original Deed / Records', type: 'text', placeholder: 'e.g. 1.00 Acres as per registered deed #4521/2026', required: true, defaultValue: '1.00 Acres as per registered partition deed #4521/2026' },
    { name: 'gazetteRef', label: 'Gazette / Sub-Collector Order Reference (if any)', type: 'text', placeholder: 'e.g. Order No. REV-GNT-2024-88', defaultValue: 'Order No. REV-GNT-2024-88' },
    { name: 'purpose', label: 'Justification & Documentary Evidence Summary', type: 'textarea', placeholder: 'Explain historical background of the mistake and reason for rectification...', required: true, defaultValue: 'Clerical data entry discrepancy during legacy digitisation. Requesting formal revenue rectifying order and portal update.' },
  ];

  return (
    <DedicatedServiceApp
      serviceId="SVC-007"
      serviceType="correction"
      title="Land Record & Passbook Correction"
      category="Revenue"
      slaDays={15}
      description="Rectification of clerical, typographical, and extent errors in revenue ledgers and computerized passbooks."
      icon={<Edit3 size={24} />}
      requiredDocs={['Original Registered Title Deed', 'Old Manual Pahani / Khasra', 'Aadhaar / Passport ID Proof', 'Sub-Collector Inam/Settlement Order (if any)']}
      customFields={fields}
    />
  );
}
