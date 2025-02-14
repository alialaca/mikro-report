"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronService = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const DataService_1 = require("./DataService");
const MailService_1 = require("./MailService");
const logger_1 = require("../utils/logger");
const config_1 = require("../config");
const ReportController_1 = require("../controllers/ReportController");
class CronService {
    constructor() {
        this.dataService = new DataService_1.DataService();
        this.mailService = new MailService_1.MailService();
        this.reportController = new ReportController_1.ReportController();
    }
    async executeReport(report) {
        try {
            const data = await this.dataService.executeQuery(report.query);
            const html = await this.reportController.generateReport(report, data);
            const mailOptions = {
                to: report.to,
                cc: report.cc,
                bcc: report.bcc,
                subject: `${report.name} - ${new Date().toLocaleDateString('tr-TR')}`,
                html
            };
            await this.mailService.sendMail(mailOptions);
            logger_1.logger.info(`Rapor başarıyla çalıştırıldı ve mail gönderildi: ${report.name}`);
        }
        catch (error) {
            logger_1.logger.error(`Rapor çalıştırma hatası (${report.name}):`, error);
        }
    }
    setupJobs() {
        config_1.reportsConfig.reports
            .filter(report => report.enabled)
            .forEach(report => {
            if (!node_cron_1.default.validate(report.cronExpression)) {
                logger_1.logger.error(`Geçersiz cron ifadesi: ${report.cronExpression} (${report.name})`);
                return;
            }
            node_cron_1.default.schedule(report.cronExpression, () => {
                logger_1.logger.info(`${report.name} raporu çalıştırılıyor...`);
                this.executeReport(report);
            });
            logger_1.logger.info(`${report.name} raporu zamanlandı: ${report.cronExpression}`);
        });
    }
}
exports.CronService = CronService;
