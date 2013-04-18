var express = require('express'),
    racks   = require('./routes/racks'),
    app     = express();

app.use(express.bodyParser());

// Routes
app.get('/racks', racks.findAll);
app.get('/racks/:id', racks.findById);
app.post('/racks', racks.addRack);
app.put('/racks/:id', racks.updateRack);
app.delete('/racks/:id', racks.deleteRack);

app.listen(3000);
console.log('Listening on port 3000');