"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseReportController = void 0;
const template_1 = require("../../utils/template");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class BaseReportController {
    loadTemplate(templateName) {
        const templatePath = path_1.default.join(__dirname, '../../templates', templateName);
        return fs_1.default.readFileSync(templatePath, 'utf8');
    }
    async generateHtml(report, data) {
        const templateData = {
            date: new Date().toLocaleDateString('tr-TR'),
            data: this.prepareData(data)
        };
        return (0, template_1.loadMjmlTemplate)(this.loadTemplate(report.template), templateData);
    }
}
exports.BaseReportController = BaseReportController;
