import { ReportConfig, ReportsConfig } from '../models/Report';

export const reportsConfig: ReportsConfig = {
  reports: <ReportConfig[]>[
    {
      id: "gunluk-siparis",
      name: "Günlük Sipariş Raporu",
      description: "Her dakika çalışır (test için)",
      cronExpression: "* * * * *",
      query: `SELECT COUNT(sto_kod) FROM STOKLAR`,
      enabled: true,
      apiEndpoint: "/templates/min-stok",
      to: "ali@fixpro.com.tr"
    },
    {
      id: "gunluk-satis",
      name: "Günlük Satış Raporu",
      description: "Her akşam 7'de günlük satış verilerini gönderir",
      cronExpression: "0 19 * * *",
      query: ``,
      enabled: false,
      apiEndpoint: "/templates/gunluk-satis"
    }
  ]
}; 