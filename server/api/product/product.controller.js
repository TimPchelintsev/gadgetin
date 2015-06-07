/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /products              ->  index
 * GET     /products/:id          ->  show
 */

'use strict';

var _ = require('lodash');
var unirest = require('unirest');
var Product = require('./product.model');

// Get list of products
exports.index = function(req, res) {

  var filter =  {};
  for ( var param in req.query ) {
      if (param !== 'page') {
        filter[param] = req.query[param];   // probably want to check in the loop
      }
  }
  var page = req.query.page || 1;
  Product.findPaginated(filter, function (err, products) {
    if(err) { return handleError(res, err); }
    return res.json(200, products);
  }, 100, page);

};

// Get a single product
exports.show = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    return res.json(product);
  });
};

exports.search = function(req, res) {
  console.log(req.query.q);
  return unirest.get('https://dev.selectinity.com/api/v1/products/search')
  .header('Accept', 'application/json')
  .query({q: req.query.q})
  .end(function (response) {
    console.log(response.body);
    res.json(response.body);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
