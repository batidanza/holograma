const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const verifyToken = require ("../../middleWare/verifyToken")
const userController = require("../controllers/usersController");

cloudinary.config({
  cloud_name: "dpnrapsvi",
  api_key: "874593837933416",
  api_secret: "c_a2SUynA5J4O6y5yFCbL6HzADA",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Media",
    resource_type: "auto",
  },
});

const upload = multer({ storage: storage });

router.get("/user", userController.getUsers);

router.post("/login", userController.loginUser);

router.get("/profile", userController.getUserProfile);

router.get("/users/:userId", userController.getUserById);

router.get("/profile-searched/:username", userController.getUserProfileByUsername);

router.put('/user/:userId/edit',  upload.array("Image"), userController.editUserProfile);

router.post("/createUser", upload.array("Image"), userController.createUser);

module.exports = router;
