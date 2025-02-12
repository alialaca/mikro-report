import axios from 'axios';
import { logger } from '../utils/logger';

export class ApiService {
  async sendData(endpoint: string, data: any) {
    try {
      const response = await axios.post(endpoint, data);
      logger.info(`Veri başarıyla gönderildi: ${endpoint}`);
      return response.data;
    } catch (error) {
      logger.error(`Veri gönderme hatası (${endpoint}):`, error);
      throw error;
    }
  }
} 