var expressApp   = require('../expressApp');
var repository  = require('./todoRepository');



expressApp.app.get('/', function(req, res) {
  res.type('text/plain');
  res.send('i am a beautiful butterfly');
});

expressApp.app.post('/post', function(req, res) {
    return res.end("sometgin");
});