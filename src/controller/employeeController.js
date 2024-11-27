const User = require('../model/EmployeeModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const {SECRET_KEY} = process.env

const createUser = async(req, res)=>{
    try {
        const {email, password, name, role} = req.body

        // CHECK USER IF ALREADY EXIST
        const existedUser =  await User.findOne({email : email});
        if(existedUser) return res.status(400).send("User already exist")

        const roleEnum = ['Admin', 'Manager', 'Employee']

        if(role){
            if(!role.includes(roleEnum)){
                return res.status(400).send("Please Enter proper role")
            }
        } else {
            return res.status(400).send("Please select role")
        }

        // CREATE NEW USER
            // HASH PASSWORD
            const salt = 10;
            const hashPassword = await bcrypt.hash(password, salt);

            const user = await User.create({
                email : email,
                password : hashPassword,
                name : name,
                role : role,
            })

            return res.status(200).send("User is registered!")  
    } catch (error) {
        return res.status(500).send(error)
    }

}

const getUserById = async(req, res)=>{
    try {
        const userId = req.params.id

        // CHECK USER IF ALREADY EXIST
        const existedUser =  await User.findById({_id : userId});
        if(!existedUser) return res.status(404).send("User does not exist")

        const {password, ...info} = existedUser._doc

        return res.status(200).json(info)
        
    } catch (error) {
        return res.status(500).send(error)
    }

}

const getAllUsers = async(req, res)=>{
    try {

        const existedUser = await User.find().select({password : 0})
        if(existedUser.length === 0) return res.status(404).send("No user's data found")
        
        return res.status(200).send(existedUser)
        
    } catch (error) {
        return res.status(500).send(error)
    }

}

const updateUser = async(req, res)=>{
    try {
        const {password, name} = req.body

        let loggedInId = req.decodedToken

        // CHECK USER IF ALREADY EXIST
        const existedUser =  await User.findById({_id : loggedInId});
        if(!existedUser) return res.status(404).send("User does not exist")

        let update = {}
        if(password){
            const salt = 10;
            const hashPassword = await bcrypt.hash(password, salt);
            update.password = hashPassword
        }
        if(name){
            update.name = name
        }

        await User.findByIdAndUpdate(loggedInId, update, {new:true})

        return res.status(200).json("User data Updated!") 
    } catch (error) {
        return res.status(500).send(error)
    }
}

const updateUserRole = async(req, res)=>{
    try {
        const {role} = req.body

        let userId = req.params.id

        const roleEnum = ['Admin', 'Manager', 'Employee']

        if(role){
            if(!role.includes(roleEnum)){
                return res.status(400).send("Please Enter proper role")
            }
        } else {
            return res.status(400).send("Please select role")
        }
        
        const existedUser =  await User.findById({_id : userId});
        if(!existedUser) return res.status(404).send("User does not exist")

        await User.findByIdAndUpdate(loggedInId, {role : role}, {new:true})

        return res.status(200).json("User data Updated!") 
    } catch (error) {
        return res.status(500).send(error)
    }
}


module.exports = {createUser, getUserById, getAllUsers, updateUser, updateUserRole}