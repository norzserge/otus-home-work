import {INewsRepository} from "../infrastructure/newsRepository";
import {IReportGenerator} from "../infrastructure/reportGenerator";

export class GenerateReportUseCase {
  private readonly _newsRepository: INewsRepository;
  private readonly _reportGenerator: IReportGenerator;

  constructor(
    newsRepository: INewsRepository,
    reportGenerator: IReportGenerator
  ) {
    this._newsRepository = newsRepository;
    this._reportGenerator = reportGenerator;
  }

  async execute(ids: Array<string>): Promise<string> {
    const newsList = await this._newsRepository.findByIds(ids);
    const filePath = await this._reportGenerator.generate(newsList);

    return filePath;
  }
}