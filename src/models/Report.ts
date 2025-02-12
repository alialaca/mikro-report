export interface ReportConfig {
  id: string;
  name: string;
  description?: string;
  cronExpression: string;
  query: string;
  enabled: boolean;
  apiEndpoint: string;
}

export type ReportsConfig = {
  reports: ReportConfig[];
}; 