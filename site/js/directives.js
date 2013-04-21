angular.module('RinDC.directives', [])
  .directive('fronturows', function() {
    return {
      restrict: 'C', // must be an HTML element
      transclude: true,
      scope: {
        row_number: '=rowNumber',
      },
      template: '<input class="input-small" type="text" ng-model="rack.frontView.row{{row_number}}.type">',
      replace: true,
    };
  });