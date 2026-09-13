import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ApplicationStatus } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const STATUS_CONFIG: Record<ApplicationStatus, { label: string; color: string; bg: string }> = {
  SUBMITTED:                      { label: 'Submitted',                   color: 'text-blue-700',   bg: 'bg-blue-50' },
  ROUTED:                         { label: 'Routed',                      color: 'text-purple-700', bg: 'bg-purple-50' },
  DOCUMENT_VERIFICATION:          { label: 'Document Verification',       color: 'text-yellow-700', bg: 'bg-yellow-50' },
  GIS_VERIFICATION:               { label: 'GIS Verification',            color: 'text-orange-700', bg: 'bg-orange-50' },
  FIELD_VERIFICATION:             { label: 'Field Verification',          color: 'text-orange-700', bg: 'bg-orange-50' },
  OFFICER_REVIEW:                 { label: 'Officer Review',              color: 'text-indigo-700', bg: 'bg-indigo-50' },
  APPROVED:                       { label: 'Approved',                    color: 'text-green-700',  bg: 'bg-green-50' },
  REJECTED:                       { label: 'Rejected',                    color: 'text-red-700',    bg: 'bg-red-50' },
  RECORD_UPDATE:                  { label: 'Record Update',               color: 'text-teal-700',   bg: 'bg-teal-50' },
  COMPLETED:                      { label: 'Completed',                   color: 'text-green-800',  bg: 'bg-green-100' },
  ADDITIONAL_INFORMATION_REQUIRED:{ label: 'Additional Info Required',    color: 'text-amber-700',  bg: 'bg-amber-50' },
};

export const APPLICATION_STATUS_FLOW: ApplicationStatus[] = [
  'SUBMITTED', 'ROUTED', 'DOCUMENT_VERIFICATION', 'GIS_VERIFICATION',
  'FIELD_VERIFICATION', 'OFFICER_REVIEW', 'APPROVED', 'RECORD_UPDATE', 'COMPLETED',
];

export function getStatusIndex(status: ApplicationStatus): number {
  return APPLICATION_STATUS_FLOW.indexOf(status);
}
