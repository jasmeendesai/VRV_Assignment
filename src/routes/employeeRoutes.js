const express = require('express')
const { Authentication, AdminAuthorisation} = require('../middleware/auth')
const { createUser, getUserById, getAllUsers, updateUser, updateUserRole, deleteUser } = require('../controller/employeeController')

// const {login,register,logout} = require('../controller/auth')

const router = express.Router()

//get all employee --> admin and manager
router.get("/get_all_user", Authentication, (req, res, next) => AdminAuthorisation(req, res, next, ['Admin', 'Manager']), getAllUsers)

router.get("/get_user/:id", Authentication, (req, res, next) => AdminAuthorisation(req, res, next, ['Admin', 'Manager']), getUserById)

//update employee details only name and password-- all
router.put("/update", Authentication, updateUser)

//update role - admin
router.put("/update", Authentication, (req, res, next) => AdminAuthorisation(req, res, next, ['Admin']), updateUserRole)

//delete employee -- admin
router.put("/deleteUser", Authentication, (req, res, next) => AdminAuthorisation(req, res, next, ['Admin']), deleteUser)

module.exports = router