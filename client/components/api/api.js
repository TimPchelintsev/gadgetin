'use strict';

angular.module('gadgetinApp')
  .factory('api', function (Restangular) {
    var baseGadgets = Restangular.all('products');
    return {
      getGadgets: function() {
        return baseGadgets.getList();
      }
    };

  });
