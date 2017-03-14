var expressApp   = require('../expressApp');
var repository  = require('./todoRepository');
var validator = require('./validation');

expressApp.get('/', function(req, res) {
    let todoList = repository.getAll();
    return res.end(JSON.stringify(todoList));
});

expressApp.post('/post', function(req, res) {
   let data = req.body;

   let valid = true;


   valid = validator.validateTitle(data.title, res);

   valid = validator.validateIsDone(data.isDone, res);

   if(valid){
   repository.create(req.body);
   }
   res.end();
});

expressApp.get('/:id', function(req, res){
  let todoElement = repository.findOne(req.params.id);
    return res.end(JSON.stringify(todoElement));
});

expressApp.put('/:id', function(req, res){

    let data = req.body;

    let id = req.params.id;

    valid = validator.validateTitle(data.title, res);

    valid = validator.validateIsDone(data.isDone, res);

    if(valid){
    repository.update(req.params.id, data);
    }
    return res.end();
});

expressApp.delete('/:id', function(req, res){
  repository.deleteElement(req.params.id);
  return res.end();
});