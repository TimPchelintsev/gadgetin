'use strict';

angular.module('gadgetinApp')
  .factory('api', function (Restangular, $http) {
    var baseProducts = Restangular.all('products');
    var baseUsers = Restangular.all('users');

    // var abortGet;

    Restangular.extendModel('users', function(user) {
      user.addProduct = function(product) {
        return Restangular.one('users', 'me').all('products').post(product);
      };
      user.updateProduct = function(product) {
        return Restangular.one('users', 'me').one('products', product._id).customPUT(product);
      };
      user.commentProduct = function(owner, product, comment) {
        return Restangular
                .one('users', owner._id)
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
      getProducts: function(_page) {

        return baseProducts.customGET('', {page: _page});
      },
      getProduct: function(id) {
        return Restangular.one('products', id).get();
      },
      searchProducts: function(query) {
        console.log(query);
        var params = {q: query};
        return baseProducts.customGET('search', params);
      },
      _searchProducts: function(query) {
        console.log(query);
        // if (abortGet) abortGet.resolve();
        // abortGet = $q.defer();
        return $http({
          url: 'http://staging.selectinity.com/api/v1/products/search',
          method: 'GET',
          params: {q: query}
        });
      }
    };

  });
