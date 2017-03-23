let todoList = [];
let lastId = 0;
function getAll(cb) {
    try{
    const todos = todoList;
    return cb(null, todos);
    } catch(e){
        return cb(new Error("Something went wrong"), null);
    }
}

function create(data, cb) {
    let todoElement = {
        id: lastId,
        title: data.title,
        description: data.description,
        isDone: "Not done",
        creationDate: new Date(),
        updateDate: new Date(),
    }

    try {
        todoList.push(todoElement);
        lastId += 1;
    } catch (e) {
        return cb(new Error('Something went wrong.'), null)
    }

    return cb(null, todoElement);
}

function findOne(id, cb) {
    try {
        const todos = todoList.filter(function (element) {
            element.id === id;
        });

        return cb(null, todos[0]);
    } catch (e) {
        return cb(new Error('No todo found'), null);
    }

}



function update(id, data, cb) {


    try{
    //Get element index in the array
    let index = todoList.findIndex(element => element.id == id);

    //Update an element in the array
    todoList[index].title = data.title;
    todoList[index].description = data.description;
    todoList[index].isDone = data.isDone;
    todoList[index].updateDate = new Date();

    return cb(null, todoList[index]);
    } catch(e){
        return cb(new Error("Something Went Wrong"), null);
    }

}

function deleteElement(id, cb) {
   
   try{

    let index = todoList.findIndex(element => element.id == id);
    if (index > -1)
        todoList.splice(index, 1);
} catch(e){
       return cb(new Error("Something Went Wrong"));
}
}


module.exports = { getAll, findOne, create, update, deleteElement };