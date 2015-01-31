'use strict';

angular.module('gadgetinApp')
  .controller('ProfileCtrl', function ($scope, Auth) {
    Auth.getCurrentUser(function(user) {
      $scope.profile = user;
    });
  });
