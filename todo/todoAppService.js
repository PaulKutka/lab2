var expressApp   = require('../expressApp');
var repository  = require('./todoRepository');


expressApp.get('/', function(req, res) {
    let todoList = repository.getAll();
    return res.end(JSON.stringify(todoList));
});

expressApp.post('/post', function(req, res) {

   repository.create(req.body);
   res.end();
});

expressApp.get('/:id', function(req, res){
  let todoElement = repository.findOne(req.params.id);
    return res.end(JSON.stringify(todoElement));
});

expressApp.put('/:id', function(req, res){
    repository.update(req.params.id, req.body);
    return res.end();
});

expressApp.delete('/:id', function(req, res){
  repository.deleteElement(req.params.id);
  return res.end();
});