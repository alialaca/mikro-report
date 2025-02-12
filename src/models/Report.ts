export interface ReportConfig {
  id: string;
  name: string;
  description?: string;
  cronExpression: string;
  query: string;
  enabled: boolean;
  to: string;
  cc?: string;
  bcc?: string;
}

export type ReportsConfig = {
  reports: ReportConfig[];
}; 