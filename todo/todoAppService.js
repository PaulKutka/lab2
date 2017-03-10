var expressApp   = require('../expressApp');
var repository  = require('./todoRepository');



expressApp.app.get('/', function(req, res) {

    todoList = repository.getAll();
    return res.end(todoList);
});

expressApp.app.post('/post', function(req, res) {
    
    return res.end(repository.create(req));
});

expressApp.app.get('/:id', function(req, res){
  return res.end(req.params.id);
});

expressApp.app.get('/get', function(req, res){
  return res.end(req.params.id);
});

expressApp.app.put(':id', function(req, res){
  return res.end(req.params.id);
});

expressApp.app.delete(':id', function(req, res){
  return res.end(req.params.id);
});