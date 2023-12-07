// userController.js
const db = require('../database/models');

const usersController = {
  getUsers: async (req, res) => {
    try {
      const registeredUsers = await db.User.findAll();
      res.json(registeredUsers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error obtaining Users' });
    }
  },

  createUser: async (req, res) => {
    try {
      const { Username, Email, Password, FirstName, LastName, DateOfBirth, Address, PhoneNumber, ProfileImageURL } = req.body;
      console.log('Datos del formulario:', req.body);
      const newUser = await db.User.create({
        Username,
        Email,
        Password,
        FirstName,
        LastName,
        DateOfBirth,
        Address,
        PhoneNumber,
        ProfileImageURL,
      });

      res.json({ success: true, message: 'Usuario creado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Error creating User' });
    }
  },
};


module.exports = usersController;
