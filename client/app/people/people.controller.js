'use strict';

angular.module('gadgetinApp')
  .controller('PeopleCtrl', function ($scope, Auth, utils, api) {
    $scope.changeView = utils.changeView;
    Auth.getCurrentUser(function(user) {
      $scope.profile = user;
    });
    $scope.search = {};
    api.getUsers().then(
      function(data) {
        $scope.users = data;
    });
  });
