var express = require('express'),
    racks   = require('./routes/racks'),
    app     = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  next();
}
app.use(allowCrossDomain);
app.use(express.bodyParser());

// Routes
app.options('/api/racks', function(req, res) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
});

app.get('/api/racks', racks.findAll);
app.get('/api/racks/:id', racks.findById);
app.post('/api/racks', racks.addRack);
app.put('/api/racks/:id', racks.updateRack);
app.delete('/api/racks/:id', racks.deleteRack);

app.listen(3000);
console.log('Listening on port 3000');