var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  slug: String,
  items: {
    type: Array,
    default: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Item'
      }
    ]
  }
});