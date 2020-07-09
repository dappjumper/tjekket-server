var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
  name: String,
  slug: String,
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