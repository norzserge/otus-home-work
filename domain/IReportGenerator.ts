import {INews} from "./News";

export interface IReportGenerator {
  generate(newsIds: Array<INews>): Promise<string>;
}
