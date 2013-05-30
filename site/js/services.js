angular.module('RinDC.services', ['ngResource']).
  factory('Rack', function($resource) {
    var Rack = $resource('https://api.mongolab.com/api/1/databases' + '/rindc/collections/racks/:id',
      { apiKey: 'si9IevnTTHd1xul1ipeTqJvCsEA0PssU' }, {
        update: { method: 'PUT' }
      }
    );

    Rack.prototype.update = function(cb) {
      return Rack.update({id: this._id.$oid}, angular.extend({}, this, {_id:undefined}), cb);
    };

    Rack.prototype.destroy = function(cb) {
      return Rack.remove({id: this._id.$oid}, cb);
    };

    return Rack;
  });