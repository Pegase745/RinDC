var mongo = require('mongodb');

var Server = mongo.Server,
    Db     = mongo.Db,
    BSON   = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true}),
        db = new Db('rindc', server);

db.open(function(err, db) {
  if(!err) {
    console.log("Connected to 'rindc' database");
  }
})

exports.findAll = function(req, res) {
	db.collection('racks', function(err, collection) {
    collection.find().toArray(function(err, items) {
      res.send(items);
    });
  });
};

exports.findById = function(req, res) {
	var id = req.params.id;

  console.log('Retrieving rack: ' + id);

  db.collection('racks', function(err, collection) {
    collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, item) {
      res.send(item);
    });
  });
};

exports.addRack= function(req, res) {
  var rack = req.body;
  rack["creation"] = new Date();

  console.log('Adding rack: ' + JSON.stringify(rack));

  db.collection('racks', function(err, collection) {
    collection.insert(rack, {safe: true}, function(err, result) {
      if(err) {
        res.send({'error': 'An error has occured on insert'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    });
  });
}

exports.updateRack = function(req, res) {
  var id   =  req.params.id,
      rack =  req.body;

  console.log('Updating rack: ' + id);
  console.log(JSON.stringify(rack));

  db.collection('racks', function(err, collection) {
    collection.update({'_id': new BSON.ObjectID(id)}, rack, {safe: true}, function(err, result) {
      if(err) {
        console.log('Error updating rack: ' + err);
        res.send({'error': 'An error has occured on update'});
      } else {
        console.log('' + result + ' rack(s) updated');
        res.send(rack);
      }
    });
  });
}

exports.deleteRack = function(req, res) {
  var id = req.params.id;

  console.log('Deleting rack: ' + id);

  db.collection('racks', function(err, collection) {
    collection.remove({'_id': new BSON.ObjectID(id)}, {safe: true}, function(err, result) {
      if(err) {
        res.send({'error': 'An error has occurred on delete - ' + err});
      } else {
        console.log('' + result + ' rack(s) deleted');
        res.send(req.body);
      }
    });
  });
}