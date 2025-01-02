import {News} from "../domain/News";
import {INewsRepository} from "../domain/INewsRepository";

export class GetAllNewsUseCase {
  private readonly _newsRepository: INewsRepository;

  constructor(newsRepository: INewsRepository) {
    this._newsRepository = newsRepository;
  }

  async execute(): Promise<Array<News>> {
    return this._newsRepository.findAll();
  }
}