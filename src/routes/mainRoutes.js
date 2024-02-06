// mainRoutes.js
const express = require("express");
const router = express.Router();
const artistRoutes = require("./artistRoutes");
const artworkRoutes = require("./artworkRoutes");
const userRoutes = require("./userRoutes");
const movieRoutes = require("./videoRoutes");
const sketchRoutes = require("./sketchRoutes")

router.use("/artists", artistRoutes);
router.use("/artworks", artworkRoutes);
router.use("/users", userRoutes);
router.use("/movies", movieRoutes);
router.use("/sketches", sketchRoutes);

// Agrega otras rutas según sea necesario

module.exports = router;
