'use strict';

angular.module('gadgetinApp')
  .factory('utils', function ($location) {

    return {
      changeView: function(path) {
        $location.path(path);
      },
      viewIsActive: function(path) {
        return path === $location.path();
      }
    };

  });
