let mongoose = require('mongoose');

let todoSchema = mongoose.Schema({
    _id: Number,
    title: String,
    description: String, //maybe TExt
    isDone: Boolean,
    creationDate: Date,
    updateDate: Date
})