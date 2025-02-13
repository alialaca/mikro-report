import { loadMjmlTemplate } from '../../utils/template';
import fs from 'fs';
import path from 'path';
import { ReportConfig } from '../../types';

export class GunlukSiparisController {
  private loadTemplate(templateName: string): string {
    const templatePath = path.join(__dirname, '../../templates', templateName);
    return fs.readFileSync(templatePath, 'utf8');
  }

  public async generateHtml(report: ReportConfig, data: any): Promise<string> {
    const templateData = {
      date: new Date().toLocaleDateString('tr-TR'),
      data: data
    };

    return loadMjmlTemplate(this.loadTemplate(report.template), templateData);
  }
} 