var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

module.exports = new Schema({
  name: String,
  slug: {
    type: String,
    slug: 'name',
    unique: true
  },
  parentCatalog: {
    type: Schema.Types.ObjectId,
    ref: 'Catalog'
  },
  SKU: String,
  price: Number,
  discount: {
    type: Object,
    default: {
        type: "",
        amount: 0
    }
  }
});