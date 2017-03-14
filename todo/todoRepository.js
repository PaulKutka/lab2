let todoList = [];
let lastId = 0;
function getAll(){
    return todoList;
}

function findOne(id){
    return todoList.filter(function(element) {
       return element.id == id;
    });
}

function create(data){
    let todoElement = {
        id: lastId,
        title:data.title,
        description:data.description,
        isDone:data.isDone,
        creationDate: new Date(),
        updateDate: new Date(),
    }
    todoList.push(todoElement);
    lastId += 1;
}

function update(id, data){
    //Get element index in the array
    let index = todoList.findIndex(element => element.id == id);

    //Update an element in the array
    todoList[index].title = data.title;
    todoList[index].description = data.description;
    todoList[index].isDone = data.isDone;
    todoList[index].updateDate = new Date();


}

function deleteElement(id){
    //Get element index in the array
    let index = todoList.findIndex(element => element.id == id);
    if(index > -1)
    todoList.splice(index, 1);
}


module.exports = {getAll, findOne, create, update, deleteElement};