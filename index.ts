import express = require('express');
import mongoose from 'mongoose'
import {router as newsRouter} from './routes/news';
import config from 'config';

const app = express();
const PORT: number = config.get("serverPort");
const dbUrl: string = config.get('dbUrl');

app.use(express.json());
app.use('/', newsRouter);

const start = async () => {
  try {
    await mongoose.connect(dbUrl);

    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT} 🚀`);
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

start();