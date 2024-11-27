const express = require('express')

const {login,register,logout} = require('../controller/auth')

const router = express.Router()

//provide only for creating admins
router.post("/register", register)

//employee routes
router.post("/login", login)
router.post("/logout", logout)


module.exports = router