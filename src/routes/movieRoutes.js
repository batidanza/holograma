const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const movieController = require("../controllers/movieController");

const videoCloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Artistas",
    allowed_formats: ["mp4", "webm", "ogg","jpg"],
  },
});

const videoCloudinaryUpload = multer({ storage: videoCloudinaryStorage });

router.get("/movies", movieController.getMovies);

router.get("/movies/:id", movieController.getMovieById);

router.post("/createMovie", videoCloudinaryUpload.array("VideoURL"), movieController.createMovie);

module.exports = router;
