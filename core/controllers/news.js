const {parser} = require("html-metadata-parser");
const News = require("../models/News/News");
const fs = require("node:fs");
const path = require("node:path");

const FOLDER_NAME = './report';
const REPORT_PATH = FOLDER_NAME + '/report.html';

const createNewsListAsHtml = (list) => {
  const items = list.map((item) => {
    return '<li><a href="' + item.url + '">' + item.title + '</a></li>';
  }).join('');

  return '<ul>' + items + '</ul>';
}

const createHtmlLayout = (news) => {
  return '<!DOCTYPE html>'
    + '<html lang="ru"><head><meta charset="utf-8"><title>News report</title></head><body>' + news + '</body></html>';
}

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
      const {newsIds: newsIds}  = req.body;
      const newsListByIds = await News.find({ '_id': { $in: newsIds } });
      const newsListAsHtml = createNewsListAsHtml(newsListByIds);
      const reportHtmlContent = createHtmlLayout(newsListAsHtml);

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