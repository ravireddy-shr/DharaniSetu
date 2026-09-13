import { DedicatedServiceApp, type CustomField } from './DedicatedServiceApp';
import { Building } from 'lucide-react';

export function BuildingApplicationPage() {
  const fields: CustomField[] = [
    { name: 'structureType', label: 'Proposed Building Type', type: 'select', options: ['Individual Residential (G+2)', 'Apartment Complex / Multi-Story', 'Commercial Complex / Retail', 'Industrial Shed'], required: true, defaultValue: 'Individual Residential (G+2)' },
    { name: 'builtUpArea', label: 'Total Proposed Built-Up Area (Sq.Ft.)', type: 'number', placeholder: 'e.g. 4200', required: true, defaultValue: '4200' },
    { name: 'plotCoverage', label: 'Plot Coverage Ratio (%)', type: 'number', placeholder: 'e.g. 60', defaultValue: '58' },
    { name: 'buildingHeight', label: 'Proposed Building Height (Meters)', type: 'number', placeholder: 'e.g. 10.5', defaultValue: '10.5' },
    { name: 'architectLicenseNo', label: 'Registered Architect / Structural Engineer License', type: 'text', placeholder: 'e.g. CA/2018/98421', required: true, defaultValue: 'CA/2018/98421' },
    { name: 'fireSafetyNOC', label: 'Fire Safety / Disaster NOC Number (if applicable)', type: 'text', placeholder: 'e.g. FS-NOC-2026-88', defaultValue: 'FS-NOC-2026-88' },
    { name: 'purpose', label: 'Site Specifications & Spatial Schedule', type: 'textarea', placeholder: 'Detail setbacks (Front, Rear, Sides), parking provisions, rainwater harvesting...', required: true, defaultValue: 'Application for construction of G+2 residential building with mandatory rainwater harvesting and 2 car parking bays.' },
  ];

  return (
    <DedicatedServiceApp
      serviceId="SVC-004"
      serviceType="building"
      title="Building Permission & Layout NOC"
      category="Town Planning"
      slaDays={25}
      description="Integrated spatial and revenue clearance for municipal or panchayat architectural construction permits."
      icon={<Building size={24} />}
      requiredDocs={['Architectural Blueprint Drawings', 'Structural Stability Certificate', 'Title Deed & Land RoR', 'Site Key Plan with Setbacks']}
      customFields={fields}
    />
  );
}
