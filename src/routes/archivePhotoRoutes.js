const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const archivePhotoController = require("../controllers/archivePhotoController");

// Configurar Cloudinary
cloudinary.config({
  cloud_name: "dpnrapsvi",
  api_key: "874593837933416",
  api_secret: "c_a2SUynA5J4O6y5yFCbL6HzADA",
});

// Configurar almacenamiento de Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ArchivePhotos", 
    resource_type: "auto", 
  },
});

const upload = multer({ storage: storage });

router.get("/archive-photos", archivePhotoController.getArchivePhotos);

router.get("/archive-photos/:photoId", archivePhotoController.getArchivePhotoById);

router.get("/byArchive/:archiveName", archivePhotoController.getPhotoByArchive);

router.post("/create-archive-photo", upload.array("Image"), archivePhotoController.createArchivePhoto);

module.exports = router;
