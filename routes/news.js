const Router = require('express');
const {NewsRepository, Report} = require("../controllers/news");

const router = new Router();
const newsRepository = new NewsRepository();
const report = new Report();

router.post('/add',newsRepository.addToDatabase);
router.get('/get-list', newsRepository.getList);
router.get('/create-report', report.create);

module.exports = router;