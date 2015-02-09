'use strict';

angular.module('gadgetinApp')
  .controller('GadgetCtrl', function ($scope, Auth, utils, api, $stateParams) {

    var productId = $stateParams.id;

    $scope.changeView = utils.changeView;
    Auth.getCurrentUser(function(user) {
      $scope.profile = user;
      $scope.product = _.find(user.products, {_id: productId}); //FIXME: error 404 handling needed
    });
  });
