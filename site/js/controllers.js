"use strict";

function RackListCtrl($scope, Rack) {
  $scope.racks = Rack.query();
}

function RackCreateCtrl($scope, $location, Rack) {
  $scope.save = function() {
    Rack.save($scope.rack, function(rack) {
      $location.path('/edit/' + rack._id.$oid);
    });
  }
}

function RackEditCtrl($scope, $location, $routeParams, Rack) {
  var self = this;

  $scope.views = ['Front view', 'Back view'];
  $scope.rackView = $scope.views[0];

  Rack.get({id: $routeParams.rackId}, function(rack) {
    self.original = rack;
    $scope.rack = new Rack(self.original);
  });

  $scope.isClean = function() {
    return angular.equals(self.original, $scope.rack);
  }

  $scope.destroy = function() {
    self.original.destroy(function() {
      $location.path('/list');
    });
  };

  $scope.save = function() {
    $scope.rack.update(function() {
      $location.path('/');
    });
  };
}