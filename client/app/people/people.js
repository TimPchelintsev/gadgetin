'use strict';

angular.module('gadgetinApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('people', {
        url: '/people',
        templateUrl: 'app/people/people.html',
        controller: 'PeopleCtrl'
      });
  });
