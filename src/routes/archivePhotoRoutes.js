const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const archivePhotoController = require("../controllers/archivePhotoController");

// Configurar Cloudinary
cloudinary.config({
  cloud_name: "dlmwxlrn8",
  api_key: "983474745932756",
  api_secret: "OPy646OEXVS-x8bO_XKq5PhG48c",
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
