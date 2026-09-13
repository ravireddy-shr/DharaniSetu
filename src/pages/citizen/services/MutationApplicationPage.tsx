import { DedicatedServiceApp, type CustomField } from './DedicatedServiceApp';
import { RefreshCw } from 'lucide-react';

export function MutationApplicationPage() {
  const fields: CustomField[] = [
    { name: 'acquisitionMode', label: 'Mode of Title Acquisition', type: 'select', options: ['Registered Sale Deed', 'Family Partition Deed', 'Will & Inheritance', 'Court Decree / Award'], required: true, defaultValue: 'Registered Sale Deed' },
    { name: 'deedNumber', label: 'Registered Document / Deed Number', type: 'text', placeholder: 'e.g. Doc No. 4521/2026, SRO Guntur', required: true, defaultValue: '4521/2026 SRO Guntur' },
    { name: 'previousOwner', label: 'Previous Pattadar on Record', type: 'text', placeholder: 'Name on existing revenue ledger', required: true, defaultValue: 'Padmavathi Konduri' },
    { name: 'deedArea', label: 'Extent Stated in Title Deed (Acres)', type: 'number', placeholder: 'e.g. 1.00', required: true, defaultValue: '1.00' },
    { name: 'surveyArea', label: 'Physical Cadastral Extent Claimed (Acres)', type: 'number', placeholder: 'e.g. 0.90', required: true, defaultValue: '0.90' },
    { name: 'khataNumber', label: 'Existing Khata Number (if known)', type: 'text', placeholder: 'e.g. Khata #412', defaultValue: 'Khata #412' },
    { name: 'passbookNumber', label: 'Existing Pattadar Passbook Number', type: 'text', placeholder: 'e.g. PPB-AP-884129', defaultValue: 'PPB-AP-884129' },
    { name: 'purpose', label: 'Grounds for Mutation & Family Tree Summary', type: 'textarea', placeholder: 'State acquisition facts, family relationships, or purchase dates...', required: true, defaultValue: 'Mutation sought pursuant to registered sale deed. RoR 1B record update requested in name of purchaser.' },
  ];

  return (
    <DedicatedServiceApp
      serviceId="SVC-002"
      serviceType="mutation"
      title="Mutation & Title Transfer"
      category="Revenue"
      slaDays={15}
      description="Update statutory Record of Rights (RoR 1B) and issue new digitized electronic Pattadar Passbook."
      icon={<RefreshCw size={24} />}
      requiredDocs={['Registered Deed / Will', 'Previous Passbook Copy', 'Aadhaar Card', 'Death / Legal Heir Certificate (if succession)']}
      customFields={fields}
    />
  );
}
