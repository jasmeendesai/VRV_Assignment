const User = require('../model/EmployeeModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const {SECRET_KEY} = process.env

const register = async(req, res)=>{
    try {
        const {email, password, name, role} = req.body

        // CHECK USER IF ALREADY EXIST
        // const existedUser =  await User.findOne({email : email, name: name});
        // if(existedUser) return res.status(400).send(`User already exist as ${existedUser.role}`)

        const existingUser = await User.findOne({
            $or: [{ email }, { name }],
          });
      
          if (existingUser) {
            if (existingUser.email === email) {
              return res.status(400).send(`Email is already registered as ${existingUser.role}`);
            }
            if (existingUser.name === name) {
              return res.status(400).send(`Name is already in use by a ${existingUser.role}`);
            }
          }

            const roleEnum = ['Admin', 'Manager', 'Employee']

            if(role){
                if(!roleEnum.includes(role)){
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


const login = async(req, res)=>{

    try {
        // const {email, password} = req.body

        // CHECK USER IF ALREADY EXIST
        const user =  await User.findOne({email : req.body.email});
        if(!user) return res.status(404).send("User not found");

        // CHECK PASSWORD CORRECT
        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if(!validPassword) return res.status(400).json("Wrong Password")

        // jwt 
        const token = jwt.sign({ userId: user._id, exp: 7560606060 }, SECRET_KEY)

        const {__v, createdAt, updatedAt, password, ...other} = user._doc
        
        return res.cookie("accessToken", token, {
            httpOnly : true,
        }).status(200).json(other)

    } catch (error) {
        return res.status(500).send(error)
    }
    

}


const logout = async(req, res)=>{
    try {
        res.clearCookie("accessToken", {
            secure : "true",
            sameSite : "none"
        }).status(200).json("User has been logged out!")
    } catch (error) {
        return res.status(500).send(error)
    }
}


module.exports = {login,register,logout}