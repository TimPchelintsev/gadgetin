/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /products              ->  index
 * GET     /products/:id          ->  show
 */

'use strict';

var _ = require('lodash');
var Product = require('./product.model');

// Get list of products
exports.index = function(req, res) {

  var filter =  {};
  for ( var param in req.query ) {
      filter[param] = req.query[param];   // probably want to check in the loop
  }

  Product.find(filter, function (err, things) {
    if(err) { return handleError(res, err); }
    return res.json(200, things);
  });
};

// Get a single product
exports.show = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    return res.json(product);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
