import mjml2html from 'mjml';
import Handlebars from 'handlebars';

// Handlebars helpers
Handlebars.registerHelper('formatMoney', function(value: number) {
  return new Intl.NumberFormat('en-US', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  }).format(value);
});

Handlebars.registerHelper('formatNumber', function(value: number) {
  return new Intl.NumberFormat('en-US', { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 2 
  }).format(value);
});

// Toplam hesaplama için helper ekleyelim
Handlebars.registerHelper('sum', function(items: any[], key: string) {
  return items.reduce((acc, item) => acc + (item[key] || 0), 0);
});

const defaultTemplate = `
<mjml>
  <mj-body width="1200px">
    <mj-section>
      <mj-column width="100%">
        <mj-text font-size="20px" font-weight="bold" align="center">
          {{title}}
        </mj-text>
        <mj-text align="center">
          {{date}} tarihli rapor
        </mj-text>
        <mj-table width="100%">
          {{#each data.[0]}}
          <th style="border-bottom: 1px solid #ecedee; text-align: left; padding: 10px;">
            {{@key}}
          </th>
          {{/each}}
          {{#each data}}
          <tr>
            {{#each this}}
            <td style="padding: 10px;">{{this}}</td>
            {{/each}}
          </tr>
          {{/each}}
        </mj-table>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

export const loadMjmlTemplate = (template: string, data: any): string => {
  try {
    const compiledTemplate = Handlebars.compile(template);
    const mjmlContent = compiledTemplate(data);
    const { html } = mjml2html(mjmlContent);
    return html;
  } catch (error: unknown) {
    throw new Error(`Template oluşturma hatası: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
  }
}; 