import { ReportConfig } from '../../types';
import { loadMjmlTemplate } from '../../utils/template';
import fs from 'fs';
import path from 'path';

export interface IReportController {
  generateHtml(report: ReportConfig, data: any): Promise<string>;
  prepareData(data: any): any;
}

export abstract class BaseReportController implements IReportController {
  protected loadTemplate(templateName: string): string {
    const templatePath = path.join(__dirname, '../../templates', templateName);
    return fs.readFileSync(templatePath, 'utf8');
  }

  abstract prepareData(data: any): any;

  public async generateHtml(report: ReportConfig, data: any): Promise<string> {
    const templateData = {
      date: new Date().toLocaleDateString('tr-TR'),
      data: this.prepareData(data)
    };

    return loadMjmlTemplate(this.loadTemplate(report.template), templateData);
  }
} 