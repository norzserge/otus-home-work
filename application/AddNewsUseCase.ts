import {News} from "../domain/News";
import {IHtmlParser} from "../domain/IHtmlParser";
import {INewsRepository} from "../domain/INewsRepository";
import {AddNewsDto} from "./dtos/AddNewsDto";

export class AddNewsUseCase {
  private readonly _htmlParser: IHtmlParser;
  private readonly _newsRepository: INewsRepository;

  constructor(htmlParser: IHtmlParser, newsRepository: INewsRepository) {
    this._htmlParser = htmlParser;
    this._newsRepository = newsRepository;
  }

  async execute(dto: AddNewsDto) {
    const {url} = dto;
    const title = await this._htmlParser.getTitleFromUrl(url);

    if (!title) {
      throw new Error('Could not fetch title');
    }

    const currentDate = new Date().toLocaleDateString("ru-RU");
    const news = new News(currentDate, url, title);

    return this._newsRepository.save(news);
  }
}