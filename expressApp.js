var express   = require('express');
var app       = express.createServer();
var routes    = require('./routes');

exports.expressApp = app;

var controllers = require('./controllers');
routes.setup(app, controllers);

app.listen(3000, function() {
  console.log('Application is listening on port 3000');
});