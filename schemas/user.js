var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Item = require('./../schemas/item')

module.exports = new Schema({
  name: {
    type: String,
    required: true,
    default: 'John Doe'
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  cart: [Item],
  transactions: []
});