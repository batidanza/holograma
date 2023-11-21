const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

//const { body } = require('express-validator');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const artistasController = require ('../controllers/artistController');

//middleware que se usa en la ruta POST de register
/*const validations = [
    body('Nombre').notEmpty().withMessage('Tienes que ingresar tu nombre'),
    body('Email').notEmpty().withMessage('Tienes que ingresar tu email'),
    
    body('Imagen').custom((value, { req }) => {
        let file = req.file;
        if(!file) {
           throw new Error('Tienes que subir una imagen');}
           return true;
    }),
    ]*/

let artistmulterDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => 
{let artistimgfolder = path.join(__dirname, '../../public/img');
 cb(null, artistimgfolder)
},
    filename: (req, file, cb) => {
let artistimg = Date.now() + file.originalname;
cb(null, artistimg);   
   },
});

let artistImageUpload = multer({ storage : artistmulterDiskStorage });

cloudinary.config({ 
    cloud_name: 'dpnrapsvi', 
    api_key: '874593837933416', 
    api_secret: 'c_a2SUynA5J4O6y5yFCbL6HzADA' 
  });
   
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Artistas',
      allowed_formats: ['jpg', 'png'], 
    },
  });

  const upload = multer({ storage: storage });

router.get('/artists', artistasController.artists);

router.get('/artistDetail/:ID', artistasController.artistDetail)

router.get('/artistRequest', artistasController.apply)

router.post('/artistRequest', upload.array('Image'), artistasController.applicationRequest);

module.exports = router;