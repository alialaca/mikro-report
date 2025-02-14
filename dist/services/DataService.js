"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataService = void 0;
const client_1 = require("@prisma/client");
const logger_1 = require("../utils/logger");
class DataService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async executeQuery(query) {
        try {
            const data = await this.prisma.$queryRawUnsafe(query);
            console.log(data);
            return data;
        }
        catch (error) {
            logger_1.logger.error('Sorgu çalıştırma hatası:', error);
            throw error;
        }
    }
}
exports.DataService = DataService;
