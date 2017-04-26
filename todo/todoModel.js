let mongoose = require('../mongooseClient');

let autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

let todoSchema = mongoose.Schema({
    title: {type: String, require: true},
    description: {type: String, required: true, maxlength: 100}, 
    isDone: {type: Boolean, required: true},
    creationDate: Date,
    updateDate: Date
})

todoSchema.plugin(autoIncrement.plugin, 'Todo');

module.exports = todoSchema;