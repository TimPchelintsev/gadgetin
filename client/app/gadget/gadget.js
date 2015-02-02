'use strict';

angular.module('gadgetinApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('gadget', {
        url: '/gadgets/:id',
        templateUrl: 'app/gadget/gadget.html',
        controller: 'GadgetCtrl',
        authenticate: true
      });
  });
