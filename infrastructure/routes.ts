import {Router} from "express";
import {AddNewsUseCase} from "../application/AddNewsUseCase";
import {GetAllNewsUseCase} from "../application/GetAllNewsUseCase";
import {GenerateReportUseCase} from "../application/GenerateReportUseCase";
import {HtmlParser} from "./htmlParser";
import {NewsRepository} from "./newsRepository";
import {ReportGenerator} from "./reportGenerator";

export const router = Router();

const newsRepository = new NewsRepository();
const htmlParser = new HtmlParser();
const reportGenerator = new ReportGenerator();

const addNewsUseCase = new AddNewsUseCase(htmlParser, newsRepository);
const getAllNewsUseCase = new GetAllNewsUseCase(newsRepository);
const generateReportUseCase = new GenerateReportUseCase(newsRepository, reportGenerator);

router.post('/add', async (req, res) => {
  try {
    const url = req.body.url;
    const newsId = await addNewsUseCase.execute(url);

    res.status(201).send({newsId});
  }
  catch (error) {
    res.status(500).send({message: 'Internal server error: ' + error});
  }
});

router.get('/get-list', async (req, res) => {
  try {
    const news = await getAllNewsUseCase.execute();

    res.status(200).send(news);
  } catch (error) {
    res.status(500).send({message: 'Internal server error: ' + error})
  }
});

router.post('/generate-report', async (req, res) => {
  try {
    const newsIds = req.body.ids;
    const filePath = await generateReportUseCase.execute(newsIds);

    res.status(200).send(filePath);
  } catch (error) {
    res.status(500).send({message: 'Internal server error: ' + error})
  }
});