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

const getUserProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    // Buscar al usuario por nombre de usuario en la base de datos
    const user = await db.User.findOne({ where: { Username: username } });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Devolver los datos del usuario
    res.json({ user });
  } catch (error) {
    console.error(error);
    // Manejar errores de token inválido o cualquier otro error
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

    // Hashear la contraseña del usuario
    const hashedPassword = await bcrypt.hash(newUser.Password, 10);
    
    const newUserRequest = await db.User.create({
      Username: newUser.Username,
      Email: newUser.Email,
      Password: hashedPassword, // Usar la contraseña hasheada
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

const getUserProfile = async (req, res) => {
  try {
    // Obtener el token de autorización del encabezado de la solicitud
    const token = req.headers.authorization;

    // Verificar si el token está presente
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    // Decodificar el token para obtener el ID de usuario
    const decodedToken = jwt.verify(token, 'your_secret_key');
    const userId = decodedToken.userId;

    // Buscar al usuario por ID en la base de datos
    const user = await db.User.findByPk(userId);

    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Devolver los datos del usuario
    res.json({ user });
  } catch (error) {
    console.error(error);
    // Manejar errores de token inválido o cualquier otro error
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const editUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId; // Obtener el ID de usuario de los parámetros de la URL

    // Recuperar los datos actualizados del usuario desde el cuerpo de la solicitud
    const updatedUserProfile = req.body;

    // Realizar la actualización en la base de datos
    await db.User.update(updatedUserProfile, { where: { ID: userId } });

    // Obtener el usuario actualizado
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
  editUserProfile, // Agregar la función editUserProfile al export
  getUserProfileByUsername
};