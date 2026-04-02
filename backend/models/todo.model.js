const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    username: { type:String, required: true},
    description:{type:String,required:true},
    date:{type:Date,required:true},
    completed: {type: Boolean,default:false},
}, {
    timestamps:true,
});

module.exports = mongoose.models.Todo || mongoose.model('Todo', todoSchema);