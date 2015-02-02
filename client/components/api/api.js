'use strict';

angular.module('gadgetinApp')
  .factory('api', function (Restangular) {
    var baseProducts = Restangular.all('products');
    var baseUsers = Restangular.all('users');

    Restangular.extendModel('users', function(user) {
      user.addProduct = function(product) {
        return Restangular.one('users', 'me').all('products').post(product);
      };
      user.commentProduct = function(user, product, comment) {
        return Restangular
                .one('users', user._id)
                .one('products', product._id)
                .all('comments').post(comment);
      };
      return user;
    });

    return {
      getUsers: function() {
        return baseUsers.getList();
      },
      getUser: function(id) {
        return Restangular.one('users', id).get();
      },
      getCurrentUser: function() {
        return Restangular.one('users', 'me').get();
      },
      getProducts: function() {
        return baseProducts.getList();
      },
      getProduct: function(id) {
        return Restangular.one('products', id).get();
      }
    };

  });
