const User = require('../model/EmployeeModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const {SECRET_KEY} = process.env


// const getUserById = async(req, res)=>{
//     try {
//         const userId = req.params.id

//         // CHECK USER IF ALREADY EXIST
//         const existedUser =  await User.findById({_id : userId, isDeleted : false});
//         if(!existedUser) return res.status(404).send("User does not exist")

//         const {password, ...info} = existedUser._doc

//         return res.status(200).json(info)
        
//     } catch (error) {
//         return res.status(500).send(error)
//     }

// }

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find user by ID and ensure it's not deleted
    const existedUser = await User.findOne({ _id: userId, isDeleted: false });
    if (!existedUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Exclude password from the response
    const { password, ...info } = existedUser.toObject();

    return res.status(200).json(info);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getAllUsers = async(req, res)=>{
    try {

        const existedUser = await User.find({isDeleted : false}).select({password : 0})
        if(existedUser.length === 0) return res.status(404).send("No user's data found")
        
        return res.status(200).send(existedUser)
        
    } catch (error) {
        return res.status(500).send(error)
    }

}

const updateUser = async(req, res)=>{
    try {
        
        const {password, name, id} = req.body

        let loggedInId = req.decodedToken

        if(loggedInId !== id){
            return res.status(403).json("Not authorised!");
        }

        // CHECK USER IF ALREADY EXIST
        const existedUser =  await User.findById({_id : loggedInId, isDeleted : false});
        if(!existedUser) return res.status(404).send("User does not exist")

        let update = {}
        if(password){
            const salt = 10;
            const hashPassword = await bcrypt.hash(password, salt);
            update.password = hashPassword
        }
        if(name){
            const existingUser = await User.findOne({name : name });
            if (existingUser?.name === name) {
                return res.status(400).send(`Name is already in use by a ${existingUser.role}`);
            }
          
           update.name = name
        }

        await User.findByIdAndUpdate(loggedInId, update, {new:true})

        return res.status(200).json("User data Updated!") 
    } catch (error) {
        return res.status(500).send(error)
    }
}

const updateUserRole = async (req, res) => {
    try {
      const { role, userId} = req.body;
      // const userId = req.params.id; // ID of the user to update
  
      // Define valid roles
      const roleEnum = ['Admin', 'Manager', 'Employee'];
  
      // Validate role
      if (!role) {
        return res.status(400).json("Please select a role");
      }
      if (!roleEnum.includes(role)) {
        return res.status(400).json("Please enter a proper role");
      }
  
      // Check if user exists
      const existedUser = await User.findOne({_id : userId, isDeleted : false});
      if (!existedUser) {
        return res.status(404).json("User does not exist");
      }
  
      // Update user role
      const updatedUser = await User.findByIdAndUpdate(
        userId, 
        { role }, 
        { new: true } // Return the updated document
      );
  
      return res.status(200).json("User data Updated!") 
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    // Check if user exists and is not deleted
    const existedUser = await User.findOne({ _id: id, isDeleted: false });
    if (!existedUser) {
      return res.status(404).json("User does not exist");
    }

    // Mark user as deleted
    await User.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true } // Return the updated document
    );

    return res.status(200).json("User data deleted!") 
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


module.exports = { getUserById, getAllUsers, updateUser, updateUserRole, deleteUser}