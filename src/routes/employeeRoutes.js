const express = require('express')
const { Authentication, AdminAuthorisation, ManagerAuthorisation, Authorisation } = require('../middleware/auth')
const { createUser, getUserById, getAllUsers, updateUser, updateUserRole } = require('../controller/employeeController')

// const {login,register,logout} = require('../controller/auth')

const router = express.Router()

//creating employee - admin
router.post("/create_user", Authentication, AdminAuthorisation, createUser)

//get employee by id --> for all
router.get("/get_user/:id",Authentication, AdminAuthorisation, ManagerAuthorisation, Authorisation, getUserById)

//get all employee --> admin and manager
router.get("/get_all_user", Authentication, AdminAuthorisation, ManagerAuthorisation, getAllUsers)

//update employee details only name and password-- all
router.get("/update", Authentication, Authorisation, updateUser)

//update role - admin
router.get("/update/:id", Authentication, AdminAuthorisation, updateUserRole)

//delete employee -- admin / manager


module.exports = router