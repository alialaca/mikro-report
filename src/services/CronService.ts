import cron from 'node-cron';
import { DataService } from './DataService';
import { MailService, MailOptions } from './MailService';
import { logger } from '../utils/logger';
import { reportsConfig } from '../config/reports';
import { ReportConfig } from '../models/Report';

export class CronService {
  private dataService: DataService;
  private mailService: MailService;

  constructor() {
    this.dataService = new DataService();
    this.mailService = new MailService();
  }

  private async executeReport(report: ReportConfig) {
    try {
      const data = await this.dataService.executeQuery(report.query);
      const mailOptions: MailOptions = {
        to: report.to,
        cc: report.cc,
        bcc: report.bcc,
        subject: `${report.name} - ${new Date().toLocaleDateString('tr-TR')}`,
        text: JSON.stringify(data, null, 2)
      }    

      await this.mailService.sendMail(mailOptions);
      logger.info(`Rapor başarıyla çalıştırıldı ve mail gönderildi: ${report.name}`);
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