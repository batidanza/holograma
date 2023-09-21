const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
//const { body } = require('express-validator');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const artistasController = require ('../controllers/artistasController');

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

let artistamulterDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => 
{let artistaimgfolder = path.join(__dirname, '../../public/img');
 cb(null, artistaimgfolder)
},
    filename: (req, file, cb) => {
let artistaimg = Date.now() + file.originalname;
cb(null, artistaimg);   
   },
});


let artistaimgUpload = multer({ storage : artistamulterDiskStorage });

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
      transformation: [{ width: 500, height: 500, crop: 'limit' }], 
    },
  });

  const upload = multer({ storage: storage });


router.get('/artistas', artistasController.artistas);

router.get('/detalleArtista/:ID', artistasController.detalleArtista)


router.get('/aplicacionArtistas', artistasController.aplica)


router.post('/aplicacionArtistas', upload.array('Imagen'), artistasController.solicitudAplicacion);

module.exports = router;