const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

const artworkController = require('../controllers/artworkController');

const imageCloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Artistas',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});


const imageCloudinaryUpload = multer({ storage: imageCloudinaryStorage });

router.get('/artworks', artworkController.artwork); 

router.get('/artworks/:id', artworkController.getArtworkById); 
 
router.get('/byArtist/:artistId', artworkController.getArtworksByArtist); 

router.get('/createArtwork', artworkController.createArt); 

router.post('/createArtwork', imageCloudinaryUpload.array('Image'), artworkController.createArtwork); 

router.get('/sketches', artworkController.sketch); 

router.get('/sketches', artworkController.sketchById);

router.post('/createSketch', imageCloudinaryUpload.array('Image') , artworkController.createSketch);

module.exports = router;
