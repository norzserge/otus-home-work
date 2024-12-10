import {Router} from "express";
import {NewsRepository, Report} from '../controllers/news';

export const router = Router();
const newsRepository = new NewsRepository();
const report = new Report();

router.post('/add',newsRepository.addToDatabase);
router.get('/get-list', newsRepository.getList);
router.get('/create-report', report.create);
