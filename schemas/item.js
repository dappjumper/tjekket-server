var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
  name: {
    type: String,
    default: 'New item',
    required: true
  },
  price: {
    type: Number,
    default: 0,
    required: true
  },
  catalogs: [String]
});