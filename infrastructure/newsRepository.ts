import {News} from "../domain/News";
import {Schema, model} from 'mongoose';

const newsSchema = new Schema({
  date: {type: Date, required: true},
  url: {type: String, required: true},
  title: {type: String, required: true},
});

const NewsModel = model('News', newsSchema);

export interface INewsRepository {
  save(news: News): Promise<string>;
  findAll(): Promise<Array<News>>;
  findByIds(ids: Array<string>): Promise<Array<News>>
}

export class NewsRepository implements INewsRepository {
  async save(news: News): Promise<string> {
    const dbNews = new NewsModel({...news})
    await dbNews.save();

    return dbNews.id;
  };

  async findAll(): Promise<Array<News>> {
    return NewsModel.find({});
  };

  async findByIds(ids: Array<string>): Promise<Array<News>> {
    return NewsModel.find({ '_id': { $in: ids } });
  };
}