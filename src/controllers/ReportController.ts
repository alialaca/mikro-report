import { GunlukSiparisController } from './reports/GunlukSiparisController';
import { ReportConfig } from '../types';

type Controllers = {
  [key: string]: GunlukSiparisController;
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