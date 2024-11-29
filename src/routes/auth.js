const express = require('express')

const {login,register,logout} = require('../controller/auth')
const { AdminAuthorisation, Authentication } = require('../middleware/auth')

const router = express.Router()

//provide only for creating admins
// router.post("/register", register)
router.post("/register",Authentication, (req, res, next) => AdminAuthorisation(req, res, next, ['Admin']), register)

//employee routes
router.post("/login", login)
router.post("/logout", logout)


module.exports = router