import {News} from "./News";

export interface INewsRepository {
  save(news: News): Promise<string>;
  findAll(): Promise<Array<News>>;
  findByIds(ids: Array<string>): Promise<Array<News>>
}
