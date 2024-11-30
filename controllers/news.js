const fs = require("node:fs");
const path = require("node:path");
const News = require("../models/News/News");
const {parser} = require("html-metadata-parser");
const {generateNewsReport} = require('../views/generateNewsReport');
const {generateNewsList} = require('../views/generateNewsList');

const FOLDER_NAME = './report';
const REPORT_PATH = FOLDER_NAME + '/report.html';

class NewsRepository {
  addToDatabase(req, res) {
    try {
      const currentDate = new Date().toLocaleDateString("ru-RU");
      const {url}  = req.body;

      parser(url)
        .then(data=> data.meta.title)
        .then(async (title) => {
          const news = new News({date: currentDate, url, title});

          await news.save();

          res.status(201).send({newsId: news.id});
        }).catch((error) => {
        res.status(500).send({message: 'Can`t parse URL: ' + error});
      });
    } catch (error) {
      res.status(500).send({message: 'Internal server error: ' + error})
    }
  }

  async getList(req, res) {
    try {
      const news = await News.find({});

      return res.status(200).send(news);
    } catch (error) {
      res.status(500).send({message: 'Internal server error: ' + error})
    }
  }
}

class Report {
  async create(req, res) {
    try {
      const {newsIds}  = req.body;
      const newsListByIds = await News.find({ '_id': { $in: newsIds } });

      const newsListAsHtml = generateNewsList(newsListByIds);
      const reportHtmlContent = generateNewsReport(newsListAsHtml);

      if (!fs.existsSync(FOLDER_NAME)) {
        fs.mkdirSync(FOLDER_NAME);
        console.log(`Directory '${FOLDER_NAME}' created`);
      } else {
        console.log(`Directory '${FOLDER_NAME}' already exists`);
      }

      fs.writeFile(REPORT_PATH, reportHtmlContent, error => {
        if (error) {
          console.error('An error occurred while creating the file: ' + error);
        } else {
          console.log('File written successfully');

          const reportPath = path.resolve(REPORT_PATH);

          res.status(200).send(reportPath);
        }
      });
    } catch (error) {
      res.status(500).send({message: 'Internal server error: ' + error})
    }
  }
}

module.exports = {
  NewsRepository,
  Report,
}