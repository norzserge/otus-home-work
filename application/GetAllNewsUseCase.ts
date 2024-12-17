import {INewsRepository} from "../infrastructure/newsRepository";
import {News} from "../domain/News";

export class GetAllNewsUseCase {
  private readonly _newsRepository: INewsRepository;

  constructor(newsRepository: INewsRepository) {
    this._newsRepository = newsRepository;
  }

  async execute(): Promise<Array<News>> {
    return this._newsRepository.findAll();
  }
}