import express = require('express');
import mongoose from 'mongoose'
import config from 'config';
import {router} from './infrastructure/routes';

const app = express();
const PORT: number = config.get("serverPort");
const dbUrl: string = config.get('dbUrl');

app.use(express.json());
app.use('/', router);

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