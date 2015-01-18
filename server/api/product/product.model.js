'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  category: String,
  name: String,
  company: String,
  imageUrl: String,
  specs: [Schema.Types.Mixed],
  active: {type: Boolean, default: true}
});

/**
 * Virtuals
 */

ProductSchema
  .virtual('name.full')
  .get(function() {
    return this.company + ' ' + this.name;
  });

module.exports = mongoose.model('Product', ProductSchema);
