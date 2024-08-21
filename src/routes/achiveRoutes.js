const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const archiveController = require("../controllers/archiveController");

cloudinary.config({
  cloud_name: "dpnrapsvi",
  api_key: "874593837933416",
  api_secret: "c_a2SUynA5J4O6y5yFCbL6HzADA",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Archives", 
    resource_type: "auto", 
  },
});

const upload = multer({ storage: storage });

router.get("/archives", archiveController.getArchives);

router.get("/archives/:archiveId", archiveController.getArchiveById);

router.post("/create-archive", upload.array("Image"), archiveController.createArchive);

module.exports = router;
