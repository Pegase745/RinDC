"use strict";

angular.module('RinDC', ['RinDC.services', 'RinDC.filters', 'RinDC.directives']).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller: RackListCtrl, templateUrl: 'tpl/rack-list.html'}).
      when('/edit/:rackId', {controller: RackEditCtrl, templateUrl: 'tpl/rack-detail.html'}).
      when('/new', {controller: RackCreateCtrl, templateUrl: 'tpl/rack-detail.html'}).
      otherwise({redirectTo: '/'});
  });