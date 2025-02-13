import { GunlukSiparisController } from './reports/GunlukSiparisController';
import { ReportConfig } from '../types';
import { IReportController } from './reports/BaseReportController';

type Controllers = {
  [key: string]: IReportController;
}

export class ReportController {
  private controllers: Controllers = {
    'gunluk-siparis': new GunlukSiparisController(),
    // Diğer rapor controllerleri buraya eklenecek
  };

  public async generateReport(report: ReportConfig, data: any): Promise<string> {
    const controller = this.controllers[report.id];
    if (!controller) {
      throw new Error(`${report.id} için controller bulunamadı`);
    }
    return controller.generateHtml(report, data);
  }
} 