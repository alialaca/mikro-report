import cron from 'node-cron';
import { DataService } from './DataService';
import { ApiService } from './ApiService';
import { logger } from '../utils/logger';
import { reportsConfig } from '../config/reports';
import { ReportConfig } from '../models/Report';

export class CronService {
  private dataService: DataService;
  private apiService: ApiService;

  constructor() {
    this.dataService = new DataService();
    this.apiService = new ApiService();
  }

  private async executeReport(report: ReportConfig) {
    try {
      const data = await this.dataService.executeQuery(report.query);
      await this.apiService.sendData(report.apiEndpoint, data);
      logger.info(`Rapor başarıyla çalıştırıldı: ${report.name}`);
    } catch (error) {
      logger.error(`Rapor çalıştırma hatası (${report.name}):`, error);
    }
  }

  public setupJobs() {
    reportsConfig.reports
      .filter(report => report.enabled)
      .forEach(report => {
        if (!cron.validate(report.cronExpression)) {
          logger.error(`Geçersiz cron ifadesi: ${report.cronExpression} (${report.name})`);
          return;
        }

        cron.schedule(report.cronExpression, () => {
          logger.info(`${report.name} raporu çalıştırılıyor...`);
          this.executeReport(report);
        });
        
        logger.info(`${report.name} raporu zamanlandı: ${report.cronExpression}`);
      });
  }
} 