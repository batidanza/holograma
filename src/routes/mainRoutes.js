// mainRoutes.js
const express = require("express");
const router = express.Router();
const artistRoutes = require("./artistRoutes");
const artworkRoutes = require("./artworkRoutes");
const userRoutes = require("./userRoutes");
const sketchRoutes = require("./sketchRoutes");
const movieRoutes = require("./movieRoutes");

router.use("/artists", artistRoutes);
router.use("/artworks", artworkRoutes);
router.use("/users", userRoutes);
router.use("/sketches", sketchRoutes);
router.use("/movies", movieRoutes);

// Agrega otras rutas según sea necesario

module.exports = router;
