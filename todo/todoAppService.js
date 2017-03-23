
const expressApp = require('../expressApp')
const repository = require('./todoRepository');



// ...

/**
 * @api {get} /api/todo List all todos
 * @apiGroup Todos
 * @apiSuccess {Object[]} todoList Todo's list
 * @apiSuccess {Number} todo.id Todo id
 * @apiSuccess {String} todo.title Todo title
 * @apiSuccess {String} todo.description Todo description
 * @apiSuccess {Boolean} todo.isDone Todo is done?
 * @apiSuccess {Date} todo.updateDate Update's date
 * @apiSuccess {Date} todo.creationDate Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": 1,
 *      "title": "Study",
 *      "description" : "Get ready for Quiz!"
 *      "isDone": false
 *      "updateDate": "2016-12-12",
 *      "creationDate": "2016-11-10"
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal error. Please try again.
 */
expressApp.get('/', (req, res) => {
    repository.getAll((error, todoList) => {
        if (error) {
            console.error(error);
            res.status(500).send({
                message: 'Internal error. Please try again.'
            });
        }
        res.status(200).send(JSON.stringify(todoList));
    });

});


/**
 * @api {post} /api/todo Create a new Todo
 * @apiGroup Todos
 * @apiParam {String} title Todo title
 * @apiParam {String} description Todo description
 * @apiParamExample {json} Input
 *    {
 *      "title": "To go swimming",
 *      "description" : "At the lake 5 pm."
 *    }
 * @apiSuccess {Number} todo.id Todo id
 * @apiSuccess {String} todo.title Todo title
 * @apiSuccess {String} todo.description Todo description
 * @apiSuccess {Boolean} todo.isDone Todo is done?
 * @apiSuccess {Date} todo.updateDate Update's date
 * @apiSuccess {Date} todo.creationDate Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 2,
 *      "title": "To go swimming",
 *      "description" : "At the lake 5 pm."
 *      "isDone": false,
 *      "updateDate": "2016-11-12",
 *      "creationDate": "2016-11-12"
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal error. Please try again.
 * 
 * @apiErrorExample {json} Validation error
 *    HTTP/1.1 400 Bad Request
 *    {
 *  "param": "title",
    "msg": "Please enter a title",
    "value": ""
 *    }
 */
expressApp.post('/', (req, res) => {

    req.checkBody("title", "Please enter a title").notEmpty();
    req.checkBody("title", "Title should not be longer than 100").len(1, 100);

    let errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errors);
    } else {
        repository.create(req.body, (error, todo) => {
            if (error) {
                console.error(error);
                res.status(500).send({
                    message: 'Internal error. Please try again.'
                });
                return;
            }

            res.status(200).send(todo);
        });
    }
});



/**
 * @api {get} /api/todo/:id Find a todo by ID
 * @apiGroup Todos
 * @apiParam {id} id Todo id
 * @apiSuccess {Number} todo.id Todo id
 * @apiSuccess {String} todo.title Todo title
 * @apiSuccess {String} todo.description Todo description
 * @apiSuccess {Boolean} todo.isDone Todo is done?
 * @apiSuccess {Date} todo.updateDate Update's date
 * @apiSuccess {Date} todo.creationDate Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "title": "Study",
 *      "description" : "Get ready for Quiz!"
 *      "isDone": false
 *      "updateDate": "2016-12-12",
 *      "creationDate": "2016-11-10"
 *    }
 * @apiErrorExample {json} Todo not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal error. Please try again.
 */
expressApp.get('/:id', function (req, res) {
    repository.findOne(req.params.id, (error, todo) => {
        if (error) {
            console.error(error);
            res.status(500).send({
                message: 'Internal error. Please try again.'
            });
            return;
        }
        if (!todo) {
            res.status(404).send({
                message: "Todo is not found"
            });
            return;
        }
        res.end(JSON.stringify(todo));
    });

});

/**
 * @api {put} /api/todo/:id Update a Todo
 * @apiGroup Todos
 * @apiParam {id} id Todo id
 * @apiParam {String} title Todo title
 * @apiParam {Boolean} done Todo is done?
 * @apiParamExample {json} Input
 *    {
 *      "title": "Study",
 *      "isDone": true
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "title": "Study",
 *      "description" : "Get ready for Quiz!"
 *      "isDone": true
 *      "updateDate": "2016-12-12",
 *      "creationDate": "2016-11-10"
 *    }
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal error. Please try again.
 * 
 *  @apiErrorExample {json} Validation error
 *    HTTP/1.1 400 Bad Request
 *    {
 *  "param": "title",
    "msg": "Please enter a title",
    "value": ""
 *    }
 */
expressApp.put('/:id', function (req, res) {

    req.checkBody("title", "Please enter a title").notEmpty();
    req.checkBody("title", "Title should not be longer than 100").len(0, 100);

    req.checkBody("isDone", "Please provide done status").notEmpty();
    req.checkBody("isDone", "Done status should be either true or false").isBoolean();

    let errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errors);
    } else {
        const id = parseInt(req.params.id);
        repository.update(req.params.id, req.body, (error, todo) => {
            if (error) {
                console.error(error);
                res.status(500).send({
                    message: 'Internal error. Please try again.'
                });
                return;
            }

            res.status(200).send(todo);

        });
    }

});

/**
 * @api {delete} /api/todo/:id Remove a Todo
 * @apiGroup Todos
 * @apiParam {id} id Todo id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 Deleted successfully.
 * @apiErrorExample {json} Deleted successfully.
 *    HTTP/1.1 500 Internal error. Please try again.
 */
expressApp.delete('/:id', function (req, res) {

    const id = parseInt(req.params.id);
    repository.deleteElement(id, (error) => {
        if (error) {
            console.error(error);
            res.status(500).send({
                message: 'Internal error. Please try again.'
            });
        }
        return res.end();
    });
});


