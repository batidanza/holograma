const { validationResult } = require('express-validator');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const db = require('../database/models');

const SECRET_KEY = process.env.SECRET_KEY; 

const getUsers = async (req, res) => {
  try {
    const registeredUsers = await db.User.findAll();
    res.json(registeredUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obtaining Users' });
  }
};

const getUserProfileByUsername = async (req, res) => {
  try {
    let { username } = req.params;
    username = username.trim(); // Eliminar espacios en blanco al principio y al final

    console.log("Buscando usuario con el nombre de usuario:", username);

    const user = await db.User.findOne({ where: { Username: username } });

    console.log("Usuario encontrado en la base de datos:", user);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json( { user } );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


const createUser = async (req, res) => {
  try {
    const newUser = req.body;
  
    console.log("Values received in req.body:", newUser);

    const userImageUpload = req.files; 
    const firstImage = userImageUpload[0].filename;

    const cloudinaryImageUrl = `https://res.cloudinary.com/dpnrapsvi/image/upload/${firstImage}`;

    const hashedPassword = await bcrypt.hash(newUser.Password, 10);
    
    const newUserRequest = await db.User.create({
      Username: newUser.Username,
      Email: newUser.Email,
      Password: hashedPassword,
      Image: cloudinaryImageUrl, 
    });
    
    res.json({ message: "User created successfully" }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error creating User ${error.message}` });
  }
}

const loginUser = async (req, res) => {
  try {
    const { Username, Password } = req.body;

    const user = await db.User.findOne({ where: { Username } });

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(Password, user.Password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user.ID }, SECRET_KEY , { expiresIn: '1h' });

    res.json({ token, user }); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await db.User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


const getUserProfile = async (req, res) => {
  try {

    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, SECRET_KEY );

    const userId = payload.userId;

    const user = await db.User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


const editUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId; 

    const updatedUserProfile = req.body;

    await db.User.update(updatedUserProfile, { where: { ID: userId } });

    const updatedUser = await db.User.findByPk(userId);

    res.json({ message: 'Perfil de usuario actualizado correctamente', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el perfil de usuario' });
  }
};

module.exports = {
  getUsers,
  createUser,
  loginUser,
  getUserProfile,
  editUserProfile, 
  getUserProfileByUsername,
  getUserById 
};

