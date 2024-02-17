// artistController.js
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
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

    // Hashear la contraseña del usuario
    const hashedPassword = await bcrypt.hash(newUser.Password, 10);
    
    const newUserRequest = await db.User.create({
      Username: newUser.Username,
      Email: newUser.Email,
      Password: hashedPassword, // Usar la contraseña hasheada
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
  const loginUser = async (req, res) => {
  try {
    const { Username, Password } = req.body;

    // Buscar al usuario por nombre de usuario en la base de datos
    const user = await db.User.findOne({ where: { Username } });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(Password, user.Password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Generar token de sesión
    const token = jwt.sign({ userId: user.ID }, 'your_secret_key', { expiresIn: '1h' });

    // Devolver el token y los datos del usuario al cliente
    res.json({ token, user }); // Aquí estás incluyendo los datos del usuario en la respuesta

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


module.exports = {
  getUsers,
  createUser,
  loginUser
};

