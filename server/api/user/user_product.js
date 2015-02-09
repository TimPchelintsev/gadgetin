'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = require('./comment').schema;

var UserProductSchema = new Schema({
  relatedProduct: Schema.Types.ObjectId,
  category: String,
  name: String,
  company: String,
  imageUrl: String,
  specs: [Schema.Types.Mixed],
  comments: [CommentSchema],
  feedback: {text: String, rating: Number},
  created: {type: Date, default: Date.now},
});

exports.schema = UserProductSchema;
exports.model = mongoose.model('UserProduct', CommentSchema);
