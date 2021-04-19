import { readFileSync } from 'fs';
import pug from "pug";

export class TemplateService {

    /**
     * 
     * @param templateName Template name and path to be read
     * @param templateVariables To be replaced by interpolation, %varName% -> value
     */
    public getHtmlTemplate(templateName: string, templateVariables: any = null): string {
        let htmlTemplateContent = templateName ? readFileSync(templateName, 'utf8') : '';
        if (templateVariables && htmlTemplateContent) {
            const keyValuesToReplace: {key: string, value: any}[] = [];
            Object.entries(templateVariables).forEach((entry: any[]) => {
                // nested objects - 1st level only. TODO: make this recursive.
                if (typeof entry[1] == 'object') {
                    Object.entries(entry[1]).forEach((innerEntry: any[]) => {
                        keyValuesToReplace.push({key: `${entry[0]}.${innerEntry[0]}`, value: innerEntry[1]});
                    });
                } else {
                    keyValuesToReplace.push({key: entry[0], value: entry[1]});
                }
            });
            let replacer = null;
            keyValuesToReplace.forEach((item) => {
                replacer = new RegExp(`%${item.key}%`, 'g')
                htmlTemplateContent = htmlTemplateContent.replace(replacer, item.value);
            })
        }
        return htmlTemplateContent;
    }

    /**
     * 
     * @param templateName 
     * @param templateVariables 
     */
    public getPubTemplate(templateName: string, templateVariables: any = null): string {
        // How to apply data variables on inner files/templates???
        const compiledTemplate = pug.renderFile(templateName, templateVariables);
        return compiledTemplate;
    }
}