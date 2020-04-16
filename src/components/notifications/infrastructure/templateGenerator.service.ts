import { injectable, inject } from 'inversify';

import { TEMPLATES, TemplateItemType } from './templateGenerator.constants';
import types from '../../../constants/types';
import { IEmailTemplateGeneratorService, ITemplateItem } from '../notification.interfaces';
import { ILoggerService } from '../../../commons/interfaces/services/ILoggerService';

@injectable()
export class EmailTemplateGeneratorService implements IEmailTemplateGeneratorService {
  @inject(types.LoggerService) private readonly loggerService: ILoggerService;

  public generateInternalTemplate(pTemplateElements: ITemplateItem[]): string {
    return this.generateTemplate(pTemplateElements, TEMPLATES.internal);
  }

  public generateExternalTemplate(pTemplateElements: ITemplateItem[]): string {
    return this.generateTemplate(pTemplateElements, TEMPLATES.external);
  }

  private generateTemplate(pTemplateElements: ITemplateItem[], pTemplate: string): string {
    let bodyString = '';

    pTemplateElements.forEach((element) => {
      switch (element.type) {
        case TemplateItemType.STRING:
          bodyString += this.generateParagraphElement(element);
          break;

        case TemplateItemType.TABLE:
          bodyString += this.generateTableElement(element);
          break;

        default:
          this.loggerService.error('Unknown template element type provided', {
            type: element.type,
          });
      }
    });
    return pTemplate.replace('$TABLE_BODY$', bodyString);
  }

  private generateParagraphElement(pElement: ITemplateItem): string {
    return `<p>${pElement.value}</p>`;
  }

  private generateTableElement(pElement: ITemplateItem): string {
    const headerRow = pElement.value[0] as string[];
    const dataRows = pElement.value.slice(1) as string[][];

    // Generate table header
    const tableHeader = (headerRow.map((heading) => {
      return `<th style = "border:1px solid black; padding:3px">${heading}</th>`;
    })).join('');

    // Generate table body
    const tableBody = (dataRows.map((row) => {
      return `<tr>${row.map((value) => {
        return `<td style="border:1px solid black; padding:3px">${value}</td>`;
      }).join('')}</tr>`;
    })).join('');

    // Return a table
    return `<table style = "width: 100%;text-align:center;">
      <thead><tr>${tableHeader}</tr></thead>
      <tbody>${tableBody}</tbody>
    </table>`;
  }
}
