"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSqlQuery = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const loadSqlQuery = (fileName) => {
    const filePath = path_1.default.join(__dirname, '..', 'queries', `${fileName}.sql`);
    try {
        return fs_1.default.readFileSync(filePath, 'utf8');
    }
    catch (error) {
        throw new Error(`SQL dosyası okunamadı: ${fileName}.sql`);
    }
};
exports.loadSqlQuery = loadSqlQuery;
