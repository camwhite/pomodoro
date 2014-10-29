'use strict';

angular.module('blocitoffApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/app/home/home.html',
        controller: 'HomeCtrl'
      })
      .state('home.work', {
        templateUrl: '/app/home/templates/home.work.html',
        controller: 'HomeCtrl'
      })
      .state('home.break', {
        templateUrl: '/app/home/templates/home.break.html',
        controller: 'HomeCtrl'
      })
  });