import parser from 'html-metadata-parser';
import {IHtmlParser} from "../domain/IHtmlParser";

export class HtmlParser implements IHtmlParser {
  async getTitleFromUrl(url: string): Promise<string | null> {
    try {
      const data = await parser(url);

      return data.meta.title;
    } catch (error) {
      console.error(`Error parsing URL ${url}: ${error}`);

      return null;
    }
  }
}