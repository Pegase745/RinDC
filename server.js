var express = require('express'),
    racks   = require('./routes/racks'),
    app     = express();

// Routes
app.get('/racks', racks.findAll);
app.get('/racks/:id', racks.findById);

app.listen(3000);
console.log('Listening on port 3000');