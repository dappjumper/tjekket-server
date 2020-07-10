var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

module.exports = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    default: 'New item',
    required: true
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true
  },
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