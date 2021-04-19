import { readFileSync } from 'fs';
import pug from "pug";

export class TemplateService {
    public getHtmlTemplate(templateName: string, templateVariables: any = null): string {
        let htmlTemplateContent = templateName ? readFileSync(templateName, 'utf8') : '';
        if (templateVariables && htmlTemplateContent) {
            Object.entries(templateVariables).forEach((entry: any[]) => {
                const replacer = new RegExp(`${entry[0]}`, 'g')
                htmlTemplateContent = htmlTemplateContent.replace(replacer, entry[1]);
            });
        }
        return htmlTemplateContent;
    }

    public getPubTemplate(templateName: string, templateVariables: any = null): string {
        // How to apply data variables on inner files/templates???
        const compiledTemplate = pug.renderFile(templateName, templateVariables);
        return compiledTemplate;
    }
}