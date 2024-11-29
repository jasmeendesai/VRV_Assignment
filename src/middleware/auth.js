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

const AdminAuthorisation = async function (req, res, next, roles = []) {
  try {
    const userLoggedin = req.decodedToken;

    // Fetch user data
    const userData = await User.findById(userLoggedin);
    if (!userData) {
      return res.status(404).json("User not found");
    }

    // Role-based authorization
    if (roles.length > 0) {
      if (roles.includes(userData.role) || userLoggedin === req.params.id) {
        return next(); 
      } 
    }

    if (userLoggedin === req.params.id) {
      return next(); 
    }


    return res.status(403).json("Not authorised!");

  } catch (error) {
    return res.status(500).json(error.message); // Internal server error
  }
};

// const ManagerAuthorisation = async function(req,res,next){
//     try{
        
//         let userLoggedin = req.decodedToken
        
//         const userData = await User.findById(userLoggedin)

//         // const userToBeModified = userData._id.toString()
            
//         if(userData.role !== "Manager"){
//             return res.status(403).json("Not authorised!")
//         }
        
//         next()

//     }
//     catch(error){
//         return res.status(500).json(error.message)
//     }

// }

// const Authorisation = async function(req,res,next){
//     try{
        
//         let {userId} = req.body
//         let userLoggedin = req.decodedToken
        
//         const userData = await User.findById(userId)

//         const userToBeModified = userData._id.toString()
            
//         if(userToBeModified!==userLoggedin){
//             return res.status(403).json("Not authorised!")
//         }
        
//         next()

//     }
//     catch(error){
//         return res.status(500).json(error.message)
//     }

// }

module.exports = { Authentication, AdminAuthorisation}
// module.exports = { Authentication, AdminAuthorisation, ManagerAuthorisation, Authorisation}