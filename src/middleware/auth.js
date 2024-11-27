const jwt = require('jsonwebtoken');
const User = require('../model/EmployeeModel')

require('dotenv').config()
const {SECRET_KEY} = process.env

const Authentication = async function(req, res, next){
    try{
        let token = req.cookies.accessToken;
        
        if(!token) return res.status(401).json("Not logged in!")

        let decodeToken = jwt.verify(token, SECRET_KEY);
        req.decodedToken = decodeToken.userId
        next()

    }
    catch(error){
        if(error.message =="Invalid token"){
            return res.status(403).json("Token is not valid!");
        }
        return res.status(500).json(error.message)
    }
}

const AdminAuthorisation = async function(req,res,next){
    try{
        
        // let {userId} = req.body
        let userLoggedin = req.decodedToken
        
        const userData = await User.findById(userLoggedin)

        // const userToBeModified = userData._id.toString()
            
        if(userData.role !== "Admin"){
            return res.status(403).json("Not authorised!")
        }
        // if(userToBeModified!==userLoggedin && userToBeModified.role !== "Admin"){
        //     return res.status(403).json("Not authorised!")
        // }
        
        next()

    }
    catch(error){
        return res.status(500).json(error.message)
    }

}
const ManagerAuthorisation = async function(req,res,next){
    try{
        
        let userLoggedin = req.decodedToken
        
        const userData = await User.findById(userLoggedin)

        // const userToBeModified = userData._id.toString()
            
        if(userData.role !== "Manager"){
            return res.status(403).json("Not authorised!")
        }
        
        next()

    }
    catch(error){
        return res.status(500).json(error.message)
    }

}

const Authorisation = async function(req,res,next){
    try{
        
        let {userId} = req.body
        let userLoggedin = req.decodedToken
        
        const userData = await User.findById(userId)

        const userToBeModified = userData._id.toString()
            
        if(userToBeModified!==userLoggedin){
            return res.status(403).json("Not authorised!")
        }
        
        next()

    }
    catch(error){
        return res.status(500).json(error.message)
    }

}

module.exports = { Authentication, AdminAuthorisation, ManagerAuthorisation, Authorisation}