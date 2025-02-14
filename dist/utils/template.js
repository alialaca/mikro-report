"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMjmlTemplate = void 0;
const mjml_1 = __importDefault(require("mjml"));
const handlebars_1 = __importDefault(require("handlebars"));
// Handlebars helpers
handlebars_1.default.registerHelper('formatMoney', function (value) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
});
handlebars_1.default.registerHelper('formatNumber', function (value) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(value);
});
// Toplam hesaplama için helper ekleyelim
handlebars_1.default.registerHelper('sum', function (items, key) {
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
const loadMjmlTemplate = (template, data) => {
    try {
        const compiledTemplate = handlebars_1.default.compile(template);
        const mjmlContent = compiledTemplate(data);
        const { html } = (0, mjml_1.default)(mjmlContent);
        return html;
    }
    catch (error) {
        throw new Error(`Template oluşturma hatası: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
    }
};
exports.loadMjmlTemplate = loadMjmlTemplate;
