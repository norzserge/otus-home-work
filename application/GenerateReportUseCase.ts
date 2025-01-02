import {INewsRepository} from "../domain/INewsRepository";
import {IReportGenerator} from "../domain/IReportGenerator";
import {GenerateReportDto} from "./dtos/GenerateReportDto";

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

  async execute(dto: GenerateReportDto): Promise<string> {
    const newsList = await this._newsRepository.findByIds(dto.ids);
    const filePath = await this._reportGenerator.generate(newsList);

    return filePath;
  }
}