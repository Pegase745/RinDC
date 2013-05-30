"use strict";

angular.module('RinDC', ['RinDC.services', 'RinDC.filters', 'ui.bootstrap']).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller: RackListCtrl, templateUrl: 'tpl/rack-list.html'}).
      when('/edit/:rackId', {controller: RackEditCtrl, templateUrl: 'tpl/rack-detail.html'}).
      when('/new', {controller: RackCreateCtrl, templateUrl: 'tpl/rack-detail.html'}).
      otherwise({redirectTo: '/'});
  })
  .directive('paginator', function () {
    var pageSizeLabel = "<strong>View </strong>";
    return {
      priority: 0,
      restrict: 'A',
      scope: {items: '&'},
      template: '<span>' + pageSizeLabel + '</span>'
              + '<select class="span1" ng-model="paginator.pageSize" ng-options="size for size in pageSizeList"></select>'
              + '<span class="pull-right"><button class="btn" ng-disabled="isFirstPage()" ng-click="decPage()">&lt;</button>'
              + ' {{paginator.currentPage+1}}/{{numberOfPages()}} '
              + '<button class="btn" ng-disabled="isLastPage()" ng-click="incPage()">&gt;</button></span>',
      replace: false,
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          pre: function preLink(scope, iElement, iAttrs, controller) {
            scope.pageSizeList = [10, 20, 50, 100];
            scope.paginator = {
              pageSize: 10,
              currentPage: 0
            };

            scope.isFirstPage = function () {
              return scope.paginator.currentPage == 0;
            };
            scope.isLastPage = function () {
              return scope.paginator.currentPage
                  >= scope.items().length / scope.paginator.pageSize - 1;
            };
            scope.incPage = function () {
              if (!scope.isLastPage()) {
                scope.paginator.currentPage++;
              }
            };
            scope.decPage = function () {
              if (!scope.isFirstPage()) {
                scope.paginator.currentPage--;
              }
            };
            scope.firstPage = function () {
              scope.paginator.currentPage = 0;
            };
            scope.numberOfPages = function () {
              return Math.ceil(scope.items().length / scope.paginator.pageSize);
            };
            scope.$watch('paginator.pageSize', function(newValue, oldValue) {
              if (newValue != oldValue) {
                scope.firstPage();
              }
            });

            // ---- Functions available in parent scope -----

            scope.$parent.firstPage = function () {
              scope.firstPage();
            };
            // Function that returns the reduced items list, to use in ng-repeat
            scope.$parent.pageItems = function () {
              var start = scope.paginator.currentPage * scope.paginator.pageSize;
              var limit = scope.paginator.pageSize;
              return scope.items().slice(start, start + limit);
            };
          },
          post: function postLink(scope, iElement, iAttrs, controller) {}
        };
      }
    };
  });