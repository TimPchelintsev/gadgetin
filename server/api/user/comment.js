'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  created: {type: Date, default: Date.now},
  text: String
});

exports.schema = CommentSchema;
exports.model = mongoose.model('Comment', CommentSchema);
