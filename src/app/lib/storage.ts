import { Report, ReportStatus } from './types';

const STORAGE_KEY = 'shaktishield_reports';
const ADMIN_KEY_STORAGE = 'shaktishield_admin_key';
const DEFAULT_KEY = 'staff123';

export const getReports = (): Report[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveReport = (report: Omit<Report, 'id' | 'timestamp' | 'status'>): Report => {
  const reports = getReports();
  const newReport: Report = {
    ...report,
    id: `R-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toISOString(),
    status: 'received',
  };
  reports.push(newReport);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  return newReport;
};

export const updateReportStatus = (id: string, status: ReportStatus): Report | null => {
  const reports = getReports();
  const index = reports.findIndex(r => r.id === id);
  if (index === -1) return null;
  
  reports[index].status = status;
  
  if (status === 'resolved') {
    reports[index].resolvedAt = new Date().toISOString();
  } else {
    // If moved back from resolved, remove the timestamp
    delete reports[index].resolvedAt;
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  return reports[index];
};

export const cleanupOldReports = (): void => {
  if (typeof window === 'undefined') return;
  const reports = getReports();
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  
  const filteredReports = reports.filter(report => {
    if (report.status === 'resolved' && report.resolvedAt) {
      const resolvedTime = new Date(report.resolvedAt).getTime();
      return (now - resolvedTime) < SEVEN_DAYS_MS;
    }
    return true;
  });

  if (filteredReports.length !== reports.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredReports));
  }
};

export const findReportByCode = (code: string): Report | null => {
  const reports = getReports();
  return reports.find(r => r.trackingCode === code) || null;
};

export const getAdminKey = (): string => {
  if (typeof window === 'undefined') return DEFAULT_KEY;
  return localStorage.getItem(ADMIN_KEY_STORAGE) || DEFAULT_KEY;
};

export const setAdminKey = (newKey: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ADMIN_KEY_STORAGE, newKey);
  }
};