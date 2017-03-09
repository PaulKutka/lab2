

class Repository {

constructor(){
    this.todoList = [];
}

getAll(){
    return this.todoList;
}

 findOne(id){
    return this.todoList[id];
}

create(todoElement){
    this.todoList.push(todoElement);
}

 update(id, changedTodoElement){
    this.todoList[id] = changedTodoElement;
    return this.todoList[id];
}

 delete(id){
    this.todoList[id] = null;
}
}

const repository = new Repository();