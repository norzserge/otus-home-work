import {Schema, model} from 'mongoose';

const NewsSchema = new Schema({
  date: {type: String, required: true},
  url: {type: String, required: true},
  title: {type: String, required: true},
});

export default model('News', NewsSchema);