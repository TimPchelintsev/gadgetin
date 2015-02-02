'use strict';

angular.module('gadgetinApp')
  .factory('utils', function ($location) {
    var isOwnPage = false;
    return {
      changeView: function(path) {
        $location.path(path);
      },
      viewIsActive: function(path) {
        return path === $location.path();
      },
      setIsOwnPage: function(value) {
        isOwnPage = value;
      },
      getIsOwnPage: function() {
        return isOwnPage;
      }
    };

  });
