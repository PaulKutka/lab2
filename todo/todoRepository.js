let mongoose = require("../mongooseClient")
let todoSchema = require("./todoModel")

let Todo = mongoose.model('Todo', todoSchema);
//let lastId = 0;

/**
 * Get all todo elements
 * @param {Callback} cb 
 */
function getAll(cb) {
    Todo.find((error, todos) => {
        if (error) {
            return cb(new Error("Something went wrong"), null);
        }
        return cb(null, todos);
    })

}

/**
 * Insert a new todo element
 * 
 * @param {JSON} data 
 * @param {*} cb 
 */
function create(data, cb) {
    let todo = new Todo({
        title: data.title,
        description: data.description,
        isDone: "false",
        creationDate: new Date(),
        updateDate: new Date(),
    });

    todo.save((error, todo) => {
        if (error) {
            return cb(new Error('Something went wrong.'), null)
        }
        return cb(null, todo);
    })
}

/**
 * Find todo element by id
 * 
 * @param {Number} id 
 * @param {*} cb 
 */
function findOne(id, cb) {

    Todo.find({ _id: id }, (error, todo) => {
        if (error) {
            return cb(new Error('No todo found'), null);
        }
        return cb(null, todo);
    })

}


/**
 * Update a todo element
 * 
 * @param {Number} id 
 * @param {*} data 
 * @param {*} cb 
 */
function update(id, data, cb) {

    Todo.findById(id, (error, todo) => {
        if (error) {
            return cb(new Error('No todo found'), null);
        }

        todo.title = data.title;
        todo.description = data.description;
        todo.isDone = data.isDone;
        todo.updateDate = new Date();

        todo.save((error, todo) => {
            if (error) {
                return cb(new Error('Something went wrong.'), null)
            }
            return cb(null, todo);
        })
    });
}


/**
 * Delete a todo element
 * 
 * @param {Number} id 
 * @param {*} cb 
 */
function deleteElement(id, cb) {

    Todo.find({ _id: id }, (error, todo) => {
        if (error) {
            return cb(new Error('No todo found'), null);
        }
        return cb(null, todo);
    })
        .remove((error) => {
            if (error) {
                return cb(new Error("Could not delete"));
            }
        })

}


module.exports = { getAll, findOne, create, update, deleteElement };