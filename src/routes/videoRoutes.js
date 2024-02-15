const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const videoController = require("../controllers/videoController");

cloudinary.config({
  cloud_name: "dpnrapsvi",
  api_key: "874593837933416",
  api_secret: "c_a2SUynA5J4O6y5yFCbL6HzADA",
});

const videoCloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    resource_type: "video",
    folder: "Movies",
    allowed_formats: ["mp4", "webm", "ogg", "mov", "jpg", "png"],
  },
});

const videoCloudinaryUpload = multer({ storage: videoCloudinaryStorage });

router.get("/movies", videoController.getVideos);

router.get("/movies/:id", videoController.getVideosById);

router.post("/createMovie", videoCloudinaryUpload.single("VideoFile") , videoController.createVideo);

module.exports = router;
