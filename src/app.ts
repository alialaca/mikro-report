import dotenv from 'dotenv';
import { CronService } from './services/CronService';
import { logger } from './utils/logger';

dotenv.config();

logger.info('Uygulama başlatılıyor...');

const cronService = new CronService();
cronService.setupJobs();

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('Uygulama kapatılıyor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('Uygulama kapatılıyor...');
  process.exit(0);
}); 