'use strict';

angular.module('gadgetinApp')
  .controller('ProfileCtrl', function ($scope, Auth, $http) {
    Auth.getCurrentUser(function(user) {
      $scope.profile = user;
      $http.get('/api/products').then(
        function(res) {
          var product = _.sample(res.data);
          var newUserProduct = {
            relatedProduct: product._id,
            category: product.category,
            name: product.name,
            company: product.company,
            imageUrl: product.imageUrl,
            specs: product.specs,
            feedback: {text: 'Best buy!', rating: 9.5}
          };
          var url = ['/api/users', $scope.profile._id, 'products'].join('/');
          $http.post(url, newUserProduct).then(
            function(res) {
              $scope.profile.products.push(res.data);
          });

        });

    });

  });
