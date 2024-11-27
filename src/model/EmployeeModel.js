const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        enum: ['Admin', 'Manager', 'Employee'], 
        default: 'Employee' 
    },
    // position : {
    //     type : String,
    //     required : true,
    //     enum: ['Intern', 'Junior', 'Senior', 'owner'], 
    // },
    // department : {
    //     type : String,
    //     required : true,
    //     enum: ['Development', 'QA', 'HR', 'Marketing', 'all'],
    // },

},{timestamps : true})

module.exports = mongoose.model('Employee', EmployeeSchema)