"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = require("../utils/logger");
class ApiService {
    async sendData(endpoint, data) {
        try {
            const response = await axios_1.default.post(endpoint, data);
            logger_1.logger.info(`Veri başarıyla gönderildi: ${endpoint}`);
            return response.data;
        }
        catch (error) {
            logger_1.logger.error(`Veri gönderme hatası (${endpoint}):`, error);
            throw error;
        }
    }
}
exports.ApiService = ApiService;
