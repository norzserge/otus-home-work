import {INews} from "../domain/News";
import {generateNewsList} from "../views/generateNewsList";
import {generateNewsReport} from "../views/generateNewsReport";
import * as fs from "node:fs";
import path from "node:path";

export interface IReportGenerator {
  generate(newsIds: Array<INews>): Promise<string>;
}

export class ReportGenerator implements IReportGenerator {
  async generate(newsList: Array<INews>): Promise<string> {
    const fileName = `report_${new Date().getTime()}.html`;
    const filePath = path.join(__dirname, '..', 'reports', fileName);

    const newsListAsHtml = generateNewsList(newsList);
    const reportHtmlContent = generateNewsReport(newsListAsHtml);

    fs.writeFile(filePath, reportHtmlContent, error => {
      if (error) {
        console.error('An error occurred while creating the file: ' + error);
      } else {
        console.log('File written successfully');
      }
    });

    return filePath;
  }
}