const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const { CloudinaryStorage } = require('multer-storage-cloudinary');

const userController= require ('../controllers/userController');

cloudinary.config({ 
    cloud_name: 'dpnrapsvi', 
    api_key: '874593837933416', 
    api_secret: 'c_a2SUynA5J4O6y5yFCbL6HzADA' 
  });
   
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Users',
      resource_type: 'auto',
    },
  });

  const upload = multer({ storage: storage });

  router.get('/users', userController.getUsers);

  router.post('/createUser', userController.createUser)


module.exports = router

