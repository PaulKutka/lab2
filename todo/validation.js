var validator = require('validator');

function validateTitle(title, res){
if(!title){
   res.write("Title is empty");
   return false;
}
if(str.len > 100){
    res.write("Title is too long");
    return false;
}
return true;
}

function validateIsDone(isDone, res){
    if(!isDone){
        res.write("Is done is not defined");
        return false;
    }

    if(!validator.isBoolean(isDone)){
        res.write("Done is not boolean");
        return false;
    };

    return true;
}

module.exports = {validateTitle, validateIsDone}