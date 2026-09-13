import { DedicatedServiceApp, type CustomField } from './DedicatedServiceApp';
import { Map } from 'lucide-react';

export function SurveyApplicationPage() {
  const fields: CustomField[] = [
    { name: 'demarcationReason', label: 'Survey Demarcation Reason', type: 'select', options: ['Boundary Stone Fixing & Demarcation', 'Sub-Division (Tippon / FMB)', 'Encroachment Verification', 'Fencing & Protection'], required: true, defaultValue: 'Boundary Stone Fixing & Demarcation' },
    { name: 'adjacentSurveys', label: 'Adjoining Survey Numbers (North, South, East, West)', type: 'text', placeholder: 'e.g. N: 124/2, S: 124/4, E: 125, W: 123', required: true, defaultValue: 'N: 124/2, S: 124/4, E: 125, W: 123' },
    { name: 'preferredSurveyDate', label: 'Preferred Physical Inspection Date', type: 'text', placeholder: 'e.g. 2026-09-25', defaultValue: '2026-09-25' },
    { name: 'dgpsRequired', label: 'High-Precision DGPS / Drone Survey Required', type: 'select', options: ['Yes (Differential GPS Rover)', 'Standard Electronic Total Station'], required: true, defaultValue: 'Yes (Differential GPS Rover)' },
    { name: 'purpose', label: 'Dispute Background / Demarcation Objectives', type: 'textarea', placeholder: 'Explain why demarcation is requested and history of boundary stones...', required: true, defaultValue: 'Erecting permanent compound wall boundary stones. Physical demarcation requested in presence of adjacent pattadars.' },
  ];

  return (
    <DedicatedServiceApp
      serviceId="SVC-005"
      serviceType="survey_verification"
      title="Cadastral Survey & Demarcation"
      category="Survey"
      slaDays={14}
      description="Physical field survey, boundary demarcation with DGPS rovers, and Field Measurement Book (FMB) digitization."
      icon={<Map size={24} />}
      requiredDocs={['Pattadar Passbook Copy', 'Current RoR 1B Record', 'Aadhaar ID Proof', 'Consent of Adjoining Owners (if available)']}
      customFields={fields}
    />
  );
}
