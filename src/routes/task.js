//creating employee
// router.post("/create_user",)

const express = require('express')
const { Authentication, AdminAuthorisation } = require('../middleware/auth')
const { createTask, getTaskByUserId, updateStatus, getTaskById, deleteTask } = require('../controller/taskController')

// const {login,register,logout} = require('../controller/auth')

const router = express.Router()

// create task -- admin / manager
router.post("/create_task", Authentication, (req, res, next) => AdminAuthorisation(req, res, next, ['Admin', 'Manager']), createTask)

// get all task by userId
router.get("/get_task/:id", Authentication, (req, res, next) => AdminAuthorisation(req, res, next, ['Admin', 'Manager']), getTaskByUserId)

// get task by id
router.get("/get_task_by_taskId/:id", Authentication, (req, res, next) => AdminAuthorisation(req, res, next, ['Admin', 'Manager']), getTaskById)

// update status of task -- admin, manager, user
router.put("/update", Authentication, (req, res, next) => AdminAuthorisation(req, res, next, ['Admin', 'Manager','Employee']), updateStatus)

// delete task -- manager/ admin
router.put("/delete", Authentication, (req, res, next) => AdminAuthorisation(req, res, next, ['Admin', 'Manager']), deleteTask)


module.exports = router