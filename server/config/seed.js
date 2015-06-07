/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
// var Product = require('../api/product/product.model');

// var products = require('../api/product/new_products.json');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    name: 'Tim Pchelintsev',
    email: 'tim@gmail.com',
    products: [],
    wishes: [],
    password: 'tim'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

// Product.find({}).remove(function() {
//   Product.create(products, function() {
//       console.log('finished populating products');
//     });
// });
