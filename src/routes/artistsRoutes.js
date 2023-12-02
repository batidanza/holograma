const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const { CloudinaryStorage } = require('multer-storage-cloudinary');

const artistasController = require ('../controllers/artistController');

cloudinary.config({ 
    cloud_name: 'dpnrapsvi', 
    api_key: '874593837933416', 
    api_secret: 'c_a2SUynA5J4O6y5yFCbL6HzADA' 
  });
   
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Artistas',
      resource_type: 'auto',
    },
  });

  const upload = multer({ storage: storage });

router.get('/artists', artistasController.artists);

router.get('/artistDetail/:ID', artistasController.artistDetail)

router.get('/artistRequest', artistasController.apply)

router.post('/artistRequest', upload.array('Image'), artistasController.applicationRequest);

module.exports = router;