let mongoose = require('../mongooseClient');
let autoIncrement = require('mongoose-auto-increment');


let todoSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: String,
    description: String, //maybe TExt
    isDone: Boolean,
    creationDate: Date,
    updateDate: Date
})

module.exports = todoSchema;