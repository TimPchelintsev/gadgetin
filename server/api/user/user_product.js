'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = require('./comment').schema;

var UserProductSchema = new Schema({
  relatedProduct: Schema.Types.ObjectId,
  name: String,
  brand: String,
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
  },
  comments: [CommentSchema],
  feedback: {text: String, rating: Number},
  created: {type: Date, default: Date.now},
});

exports.schema = UserProductSchema;
exports.model = mongoose.model('UserProduct', CommentSchema);
