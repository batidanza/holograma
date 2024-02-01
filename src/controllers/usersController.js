// artistController.js
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

const getUsers = async (req, res) => {
  try {
    const registeredUsers = await db.User.findAll();
    res.json(registeredUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obtaining Users' });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = req.body;
  
    console.log("Values received in req.body:", newUser);
    const userImageUpload = req.files; 
    const firstImage = userImageUpload[0].filename;

    const cloudinaryImageUrl = `https://res.cloudinary.com/dpnrapsvi/image/upload/${firstImage}`;
    
    const newUserRequest = await db.User.create({
      Username: newUser.Username,
      Email: newUser.Email,
      Password: newUser.Password,
      DateOfBirth: newUser.DateOfBirth,
      PhoneNumber: newUser.PhoneNumber,
      Image: cloudinaryImageUrl, 
    });
    
    res.json({ message: "User created successfully" }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error creating User ${error.message}` });
  }
}
module.exports = {
  getUsers,
  createUser,
};

