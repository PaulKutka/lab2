var expressApp   = require('../expressApp');
var repository  = require('./todoRepository');
var validator = require('./validation');


/**
 * @api {get} / Request todoList
 * @apiName getTodoList
 * @apiGroup todo
 *
 *
 * @apiSuccess {Object[]} todoList Array of todo objects.
 */
expressApp.get('/', function(req, res) {
    let todoList = repository.getAll();
    return res.end(JSON.stringify(todoList));
});


/**
 * @api {post} /post Create Todo element
 * @apiName createTodo
 * @apiGroup todo
 *
 * @apiParam {String} title Title of the todo element
 * @apiParam {String} [description] Description of the todo element
 * @apiParam {Boolean} isDone Indicator showing that element is or is not done
 */
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

/**
 * @api {get} /:id Request todoList
 * @apiName getTodoElement
 * @apiGroup todo
 *
 *
 * @apiSuccess {Object} todoElement A single todo element
 */
expressApp.get('/:id', function(req, res){
  let todoElement = repository.findOne(req.params.id);
    return res.end(JSON.stringify(todoElement));
});

/**
 * @api {put} /:id Update todo element
 * @apiName updateTodo
 * @apiGroup todo
 *
 * @apiParam {String} title Title of the todo element
 * @apiParam {String} [description] Description of the todo element
 * @apiParam {Boolean} isDone Indicator showing that element is or is not done
 *
 */
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

/**
 * @api {delete} /:id Delete todo element
 * @apiName deleteTodoElement
 * @apiGroup todo
 *
 *
 * 
 */
expressApp.delete('/:id', function(req, res){
  repository.deleteElement(req.params.id);
  return res.end();
});