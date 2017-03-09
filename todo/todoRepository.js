
exports.repository = new Repository;

class Repository {

var todoList = []

export function getAll(){
    return this.todoList;
}

export function findOne(id){
    return this.todoList[id];
}

export function create(todoElement){
    this.todoList.push(todoElement);
}

export function update(id, changedTodoElement){
    this.todoList[id] = changedTodoElement;
    return this.todoList[id];
}

export function delete(id){
    this.todoList[id] = null;
}
}