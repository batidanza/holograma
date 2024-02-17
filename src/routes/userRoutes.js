// artistRoutes.js
const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const userController = require("../controllers/usersController");

cloudinary.config({
  cloud_name: "dpnrapsvi",
  api_key: "874593837933416",
  api_secret: "c_a2SUynA5J4O6y5yFCbL6HzADA",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Artistas",
    resource_type: "auto",
  },
});

const upload = multer({ storage: storage });

router.get("/user", userController.getUsers);

router.post('/login', userController.loginUser);


router.post(
  "/createUser",
  upload.array("Image"),
  userController.createUser
);

module.exports = router;

