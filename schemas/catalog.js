var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
  name: {
    type: String,
    default: 'New catalog',
    required: true
  },
  items: [Object]
});