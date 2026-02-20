export type ReportStatus = 'received' | 'reviewing' | 'action-taken' | 'resolved';

export interface Report {
  id: string;
  timestamp: string;
  type: string;
  description: string;
  platform: string;
  dateOfIncident: string;
  status: ReportStatus;
  trackingCode?: string;
  anonymous: boolean;
  resolvedAt?: string;
}

export type HarassmentType = 
  | 'Cyberstalking'
  | 'Online Harassment'
  | 'Inappropriate Content'
  | 'Identity Theft'
  | 'Threats'
  | 'Privacy Breach'
  | 'Other';

export const platforms = [
  'Instagram',
  'WhatsApp',
  'Snapchat',
  'Discord',
  'X (Twitter)',
  'Telegram',
  'In-Person (College)',
  'Other'
];