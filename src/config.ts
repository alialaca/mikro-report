import { ReportConfig, ReportsConfig } from './types';
import { loadSqlQuery } from './utils/sql';

export const reportsConfig: ReportsConfig = {
  reports: <ReportConfig[]>[
    {
      id: "gunluk-siparis",
      name: "Günlük Sipariş Raporu",
      description: "Her dakika çalışır (test için)",
      cronExpression: "* * * * *",
      query: loadSqlQuery('gunluk-siparis'),
      template: "gunluk-siparis.mjml",
      enabled: true,
      to: "ali@fixpro.com.tr"
    },
    {
      id: "gunluk-satis",
      name: "Günlük Satış Raporu",
      description: "Her akşam 7'de günlük satış verilerini gönderir",
      cronExpression: "0 19 * * *",
      query: loadSqlQuery('gunluk-satis'),
      template: "gunluk-satis.mjml",
      enabled: false,
      to: "ali@fixpro.com.tr"
    }
  ]
}; 