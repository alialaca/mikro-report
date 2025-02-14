"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const CronService_1 = require("./services/CronService");
const logger_1 = require("./utils/logger");
dotenv_1.default.config();
logger_1.logger.info('Uygulama başlatılıyor...');
const cronService = new CronService_1.CronService();
cronService.setupJobs();
// Graceful shutdown
process.on('SIGTERM', () => {
    logger_1.logger.info('Uygulama kapatılıyor...');
    process.exit(0);
});
process.on('SIGINT', () => {
    logger_1.logger.info('Uygulama kapatılıyor...');
    process.exit(0);
});
