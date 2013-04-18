angular.module('racks').config(function($routeProvider) {
  $routeProvider.
    when('/rack', {templateUrl: 'home.html'}).
    when('/rack/:rackId', {controller: DetailCtrl, templateUrl: 'tpl/rack-details.html'}).
    otherwise({redirectTo: '/'});
});

function ListCtrl($scope, Rack) {
  $scope.racks = Rack.query();
}

function DetailCtrl($scope, Rack) {
  $scope.racks = Rack.get({rackId: this.params.rackId});

  this.saveRack = function() {
    if(this.rack.id > 0) {
      this.rack.$update({rackId: this.rack.id});
    } else {
      this.rack.$save();
    }

  }
}