var express   = require('express');
bodyParser = require('body-parser');

var app       = express()

//Require to parse body in json format
app.use(bodyParser.json());


app.listen(3000, function() {
  console.log('Application is listening on port 3000');
});

module.exports = app;

