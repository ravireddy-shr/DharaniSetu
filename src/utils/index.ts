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
  SUBMITTED:                      { label: 'Submitted',                   color: 'text-slate-800',  bg: 'bg-slate-100' },
  ROUTED:                         { label: 'Routed',                      color: 'text-[#1D0A69]',  bg: 'bg-[#F3F0FC]' },
  DOCUMENT_VERIFICATION:          { label: 'Document Verification',       color: 'text-[#D97706]',  bg: 'bg-[#FEF3C7]' },
  GIS_VERIFICATION:               { label: 'GIS Verification',            color: 'text-[#EA580C]',  bg: 'bg-[#FFF7ED]' },
  FIELD_VERIFICATION:             { label: 'Field Verification',          color: 'text-[#EA580C]',  bg: 'bg-[#FFF7ED]' },
  OFFICER_REVIEW:                 { label: 'Officer Review',              color: 'text-[#1D0A69]',  bg: 'bg-[#F3F0FC]' },
  APPROVED:                       { label: 'Approved',                    color: 'text-[#16A34A]',  bg: 'bg-[#DCFCE7]' },
  REJECTED:                       { label: 'Rejected',                    color: 'text-[#DC2626]',  bg: 'bg-[#FEE2E2]' },
  RECORD_UPDATE:                  { label: 'Record Update',               color: 'text-[#115E59]',  bg: 'bg-[#F0FDFA]' },
  COMPLETED:                      { label: 'Completed',                   color: 'text-[#16A34A]',  bg: 'bg-[#DCFCE7]' },
  ADDITIONAL_INFORMATION_REQUIRED:{ label: 'Additional Info Required',    color: 'text-[#EA580C]',  bg: 'bg-[#FFF7ED]' },
};

export const APPLICATION_STATUS_FLOW: ApplicationStatus[] = [
  'SUBMITTED', 'ROUTED', 'DOCUMENT_VERIFICATION', 'GIS_VERIFICATION',
  'FIELD_VERIFICATION', 'OFFICER_REVIEW', 'APPROVED', 'RECORD_UPDATE', 'COMPLETED',
];

export function getStatusIndex(status: ApplicationStatus): number {
  return APPLICATION_STATUS_FLOW.indexOf(status);
}
