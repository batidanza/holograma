// mainRoutes.js
const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const movieRoutes = require("./videoRoutes");
const mediaRoutes = require("./mediaRoutes")

router.get("/", (req, res) => {
    res.send("Welcome to the root URL");
  });

router.use("/users", userRoutes);
router.use("/media", mediaRoutes);
router.use("/movies", movieRoutes);

// Agrega otras rutas según sea necesario

module.exports = router;