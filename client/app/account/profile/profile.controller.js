'use strict';

angular.module('gadgetinApp')
  .controller('ProfileCtrl', function ($scope, Auth, $state, $stateParams, api, utils) {
    Auth.getCurrentUser(function(user) {
      $scope.currentUser = user;
      if ($state.is('profile')) {
         $scope.profile = user;
         utils.setIsOwnPage(true);
      } else {
        var userId = $stateParams.id;
        if (userId === $scope.currentUser._id) {
          $scope.profile = user;
          utils.setIsOwnPage(true);
        } else {
          $scope.profile = api.getUser(userId).$object;
          console.log($scope.profile);
          utils.setIsOwnPage(false);
        }
      }
      $scope.isOwnPage = utils.getIsOwnPage;
    });

    $scope.changeView = utils.changeView;
    $scope.logout = function() {
      Auth.logout();
      utils.changeView('/login');
    };
    $scope.submit = function(product, _text) {
      var comment = {
        author: $scope.currentUser._id,
        text: _text,
      };
      $scope.currentUser.commentProduct($scope.profile, product, comment).then(
        function(comment) {
          console.log(comment);
          product.comments.push(comment);
          product.comment = null;

        });
    };
    $scope.editDone = function(product) {
      $scope.profile.updateProduct(product).then(
        function(data) {
          console.log(data);
          product.feedback.text = data.feedback.text;
          product.edit = false;
      });
    };
  });
