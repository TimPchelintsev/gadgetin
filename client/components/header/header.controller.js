'use strict';

angular.module('gadgetinApp')
  .controller('HeaderCtrl', function ($scope, utils, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.changeView = utils.changeView;

    $scope.logout = function() {
      Auth.logout();
      utils.changeView('/login');
    };

    $scope.isActive = function(route) {
      return utils.viewIsActive(route);
    };

    Auth.getCurrentUser(function(user) {
      $scope.profile = user;
    });
  });
