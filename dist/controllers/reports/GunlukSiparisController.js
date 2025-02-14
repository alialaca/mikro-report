"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GunlukSiparisController = void 0;
const BaseReportController_1 = require("./BaseReportController");
class GunlukSiparisController extends BaseReportController_1.BaseReportController {
    prepareData(data) {
        // Veriyi template için hazırla
        // Örneğin: Sıralama, filtreleme, gruplama vs.
        return data;
    }
}
exports.GunlukSiparisController = GunlukSiparisController;
