"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_1 = require("../utils/logger");
class MailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
        });
    }
    async sendMail(options) {
        try {
            const mailOptions = {
                from: process.env.MAIL_FROM,
                ...options
            };
            console.log(mailOptions);
            const info = await this.transporter.sendMail(mailOptions);
            logger_1.logger.info(`Mail başarıyla gönderildi: ${info.messageId}`);
            return info;
        }
        catch (error) {
            logger_1.logger.error('Mail gönderme hatası:', error);
            throw error;
        }
    }
}
exports.MailService = MailService;
