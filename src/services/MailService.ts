import nodemailer from 'nodemailer';
import { logger } from '../utils/logger';

export type MailOptions= {
    from?: string
    to: string
    subject: string
    cc?: string
    bcc?: string
    text?: string
    html?: string
}

export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
    });
  }

  async sendMail(options: MailOptions) {
    try {
      const mailOptions: MailOptions = {
        from: process.env.MAIL_FROM,
        ...options
      };

      console.log(mailOptions)
    

      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Mail başarıyla gönderildi: ${info.messageId}`);
      return info;
    } catch (error) {
      logger.error('Mail gönderme hatası:', error);
      throw error;
    }
  }
} 