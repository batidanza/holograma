const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const archiveController = require("../controllers/archiveController");

cloudinary.config({
  cloud_name: "dlmwxlrn8",
  api_key: "983474745932756",
  api_secret: "OPy646OEXVS-x8bO_XKq5PhG48c",
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
