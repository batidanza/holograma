// sketchRoutes.js
const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const sketchController = require("../controllers/sketchController");

const imageCloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Artistas",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const imageCloudinaryUpload = multer({ storage: imageCloudinaryStorage });

router.get("/sketches", sketchController.getSketches);

router.get("/sketches/:sketchId", sketchController.getSketchById);

router.post(
  "/createSketch",
  imageCloudinaryUpload.array("Image"),
  sketchController.createSketch
);

module.exports = router;
