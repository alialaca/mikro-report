import mjml2html from 'mjml';
import Handlebars from 'handlebars';

const defaultTemplate = `
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="20px" font-weight="bold">
          {{title}}
        </mj-text>
        <mj-text>
          {{date}} tarihli rapor
        </mj-text>
        <mj-table>
          {{#each data}}
            <tr>
              <td>{{@key}}</td>
              <td>{{this}}</td>
            </tr>
          {{/each}}
        </mj-table>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

export const loadTemplate = (title: string, data: any): string => {
  try {
    const compiledTemplate = Handlebars.compile(defaultTemplate);
    const mjmlContent = compiledTemplate({
      title,
      date: data.date,
      data: data.data
    });
    const { html } = mjml2html(mjmlContent);
    return html;
  } catch (error) {
    throw new Error(`Template oluşturma hatası: ${error.message}`);
  }
}; 