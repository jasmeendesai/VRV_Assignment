const User = require('../model/EmployeeModel')
const Task = require('../model/TaskModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const {SECRET_KEY} = process.env


const createTask = async(req, res)=>{
    try {
        
        const {title, description, status, userId} = req.body

        const user = await Task.create({
            title : title, 
            description : description, 
            status : status, 
            userId : userId
        })

        return res.status(200).send("Task Created!") 

    } catch (error) {
        return res.status(500).send(error)
    }
}


const getTaskByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find user by ID and ensure it's not deleted
    const taskData = await Task.find({ userId: userId, isDeleted: false });

    return res.status(200).json(taskData);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


const getTaskById = async(req, res)=>{
    try {
        const {taskId} = req.body
        const taskData = await Task.findOne({_id : taskId, isDeleted : false})
        if(!taskData) return res.status(404).send("No task data found")
        
        return res.status(200).send(taskData)
        
    } catch (error) {
        return res.status(500).send(error)
    }

}

const updateStatus = async(req, res)=>{
    try {
        
        const {status, taskId} = req.body

        const taskData =  await Task.findOne({_id : taskId, isDeleted : false});
        
        if(!taskData) return res.status(404).send("No tasks found");

        // Define valid roles
        const statusEnum = ["todo", "in-progress", "completed"]
  
      // Validate role
      if (!status) {
        return res.status(400).json("Please select a status");
      }
      if (!statusEnum.includes(status)) {
        return res.status(400).json("Please enter a proper status");
      }


        await User.findByIdAndUpdate(taskId, {status : status}, {new:true})

        return res.status(200).json("Status of task updated successfully!") 
    } catch (error) {
        return res.status(500).send(error)
    }
}


const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;

    // Check if user exists and is not deleted
    const taskData = await User.findOne({ _id: id, isDeleted: false });
    if (!taskData) {
      return res.status(404).json("No reacords found!");
    }

    // Mark user as deleted
    await User.findByIdAndUpdate(
      taskId,
      { isDeleted: true },
      { new: true } // Return the updated document
    );

    return res.status(200).json("task deleted successfly!") 
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


module.exports = { createTask, getTaskByUserId, getTaskById, updateStatus, deleteTask}