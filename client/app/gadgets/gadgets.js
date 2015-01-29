'use strict';

angular.module('gadgetinApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('gadgets', {
        url: '/gadgets',
        templateUrl: 'app/gadgets/gadgets.html',
        controller: 'GadgetsCtrl'
      });
  });
