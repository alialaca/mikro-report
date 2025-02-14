"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GunlukSatisController = void 0;
const BaseReportController_1 = require("./BaseReportController");
class GunlukSatisController extends BaseReportController_1.BaseReportController {
    prepareData(data) {
        // Satış verilerini hazırla
        return data;
    }
}
exports.GunlukSatisController = GunlukSatisController;
