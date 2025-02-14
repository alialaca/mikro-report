"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const GunlukSiparisController_1 = require("./reports/GunlukSiparisController");
class ReportController {
    constructor() {
        this.controllers = {
            'gunluk-siparis': new GunlukSiparisController_1.GunlukSiparisController(),
            // Diğer rapor controllerleri buraya eklenecek
        };
    }
    async generateReport(report, data) {
        const controller = this.controllers[report.id];
        if (!controller) {
            throw new Error(`${report.id} için controller bulunamadı`);
        }
        return controller.generateHtml(report, data);
    }
}
exports.ReportController = ReportController;
