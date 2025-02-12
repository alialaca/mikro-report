import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

export class DataService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async executeQuery(query: string) {
    try {
      const data = await this.prisma.$queryRawUnsafe(query);
      console.log(data);
    
      return data;
    } catch (error) {
      logger.error('Sorgu çalıştırma hatası:', error);
      throw error;
    }
  }
} 