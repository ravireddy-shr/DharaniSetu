import { DedicatedServiceApp, type CustomField } from './DedicatedServiceApp';
import { Layers } from 'lucide-react';

export function ConversionApplicationPage() {
  const fields: CustomField[] = [
    { name: 'currentClassification', label: 'Current Revenue Classification', type: 'select', options: ['Agricultural (Wet Land)', 'Agricultural (Dry Land)', 'Fallow Land'], required: true, defaultValue: 'Agricultural (Dry Land)' },
    { name: 'proposedClassification', label: 'Proposed Non-Agricultural Use', type: 'select', options: ['Residential Layout', 'Commercial Complex', 'Industrial / Warehouse', 'Institutional / School'], required: true, defaultValue: 'Commercial Complex' },
    { name: 'conversionExtent', label: 'Extent Proposed for Conversion (Acres)', type: 'number', placeholder: 'e.g. 1.20', required: true, defaultValue: '1.20' },
    { name: 'roadWidth', label: 'Width of Access Approach Road (Feet)', type: 'number', placeholder: 'e.g. 40', required: true, defaultValue: '40' },
    { name: 'masterPlanZone', label: 'Master Plan / Urban Development Authority Zone', type: 'text', placeholder: 'e.g. R-2 Mixed Residential Zone', defaultValue: 'Commercial Corridor Zone' },
    { name: 'conversionFeeChallan', label: 'NALA Conversion Statutory Fee Challan (₹)', type: 'text', placeholder: 'e.g. NALA-CF-2026-90124 (9% basic value)', required: true, defaultValue: 'NALA-CF-2026-90124' },
    { name: 'purpose', label: 'Project Description & Proposed Activity', type: 'textarea', placeholder: 'Describe planned building or commercial activity...', required: true, defaultValue: 'Conversion requested for establishing logistics warehouse and agro-processing distribution facility.' },
  ];

  return (
    <DedicatedServiceApp
      serviceId="SVC-003"
      serviceType="conversion"
      title="Land Use Conversion (NALA)"
      category="Revenue"
      slaDays={21}
      description="Convert agricultural landholdings to statutory non-agricultural classifications under the NALA Act."
      icon={<Layers size={24} />}
      requiredDocs={['Title Deed & 1B Adangal', 'Field Measurement Book (FMB)', 'Local Body / Panchayat NOC', 'NALA Fee Payment Receipt']}
      customFields={fields}
    />
  );
}
