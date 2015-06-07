'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoosePages = require('mongoose-pages');

var ProductSchema = new Schema({
  name: {type: String, es_indexed: true},
  brand: {type: String, es_indexed: true},
  category: {
    en: String,
    ua: String,
    ru: String
  },
  images: [String],
  specs: {
    es_indexed: false,
    en: [{
      name: String,
      value: String
    }],
    ua: [{
      name: String,
      value: String
    }],
    ru: [{
      name: String,
      value: String
    }]
  }
});

mongoosePages.skip(ProductSchema); // makes the findPaginated() method available

/**
 * Virtuals
 */

ProductSchema
  .virtual('name.full')
  .get(function() {
    return this.brand + ' ' + this.name;
  });

module.exports = mongoose.model('Product', ProductSchema);
