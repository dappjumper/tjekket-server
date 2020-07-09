var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
  name: String,
  username: String,
  email: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  password: String,
  role: {
    type: String,
    default: ''
  },
  cart: {
    type: Array,
    default: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Item'
      }
    ]
  },
  transactions: {
    type: Array,
    default: new Array(0)
  }
});