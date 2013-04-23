"use strict";

function RackListCtrl($scope, Rack) {
  // Retrieve list of racks
  $scope.racks = Rack.query();
}

function RackCreateCtrl($scope, $location, Rack) {

  // Views selector for creation
  $scope.views = ['-- Select view --', 'Front view', 'Back view'];
  $scope.rackView = $scope.views[0];

  $scope.frontRows = [];
  $scope.backRows = [];

  for(var i=42;i>0;i--)
  {
    $scope.frontRows.push({
      id: i,
      type: '',
      brand: '',
      model: '',
      sticker: '',
      u_type: '',
      powers: '',
      networks: '',
      owner: ''
    });

    $scope.backRows.push({
      id: i,
      type: '',
      brand: '',
      model: '',
      sticker: '',
      u_type: '',
      powers: '',
      networks: '',
      owner: ''
    });
  }

  $scope.save = function() {
    $scope.rack.frontRows = $scope.frontRows;
    $scope.rack.backRows = $scope.backRows;
    Rack.save($scope.rack, function(rack) {
      $location.path('/edit/' + rack._id.$oid);
    });
  }
}

function RackEditCtrl($scope, $location, $routeParams, Rack) {
  var self = this;

  // Views selector for creation
  $scope.views = ['Front view', 'Back view'];
  $scope.rackView = $scope.views[0];

  Rack.get({id: $routeParams.rackId}, function(rack) {
    self.original = rack;
    $scope.rack = new Rack(self.original);
    $scope.frontRows = $scope.rack.frontRows;
    $scope.backRows = $scope.rack.backRows;
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