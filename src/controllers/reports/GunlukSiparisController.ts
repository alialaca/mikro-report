import { BaseReportController } from './BaseReportController';

export class GunlukSiparisController extends BaseReportController {
  prepareData(data: any): any {
    // Veriyi template için hazırla
    // Örneğin: Sıralama, filtreleme, gruplama vs.
    return data;
  }
} 