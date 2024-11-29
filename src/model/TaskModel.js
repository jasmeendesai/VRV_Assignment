const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true,
        enum: ["todo", "in-progress", "completed"], 
        default: 'pending' 
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',  
        required: true,
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},{timestamps : true})

module.exports = mongoose.model('Task', TaskSchema)