const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const newsRouter = require('./core/routes/news');

const app = express();
const PORT = config.get("serverPort");
const dbUrl = config.get('dbUrl');

app.use(express.json());
app.use('/', newsRouter);

const start = async () => {
  try {
    await mongoose.connect(dbUrl);

    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT} 🚀`);
    });
  } catch (e) {
    console.log('Server error:', e.message);
    process.exit(1);
  }
}

start();