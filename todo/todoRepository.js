const ToDo = require('./ToDo');

let todoList = [];

function getAll(){
    return this.todoList;
}

function findOne(id){
    this.todoList.forEach(function(element) {
        if(element.id == id){
            return this;
        }
    }, this);
}

function create(todoElement){
    this.todoList.push(todoElement);
}

function update(id, changedTodoElement){
    this.todoList[id] = changedTodoElement;
    return this.todoList[id];
}

function deleteElement(id){
    this.todoList[id] = null;
}

module.exports = {getAll, findOne, create, update, deleteElement};