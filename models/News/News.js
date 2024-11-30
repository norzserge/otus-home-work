const {Schema, model} = require('mongoose');

const NewsSchema = new Schema({
  date: {type: String, required: true},
  url: {type: String, required: true},
  title: {type: String, required: true},
});

module.exports = model('News', NewsSchema);