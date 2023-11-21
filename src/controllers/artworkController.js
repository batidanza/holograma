// const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

const artworksController = {
  sketchControl: (req, res) => {
    res.json({ message: "OK" }); // Respond with a JSON message
  },

  artwork: async (req, res) => {
    try {
      const registeredArtworks = await db.Artwork.findAll({
        include: [{ model: db.Artist, as: 'Artist' }]
      });
      res.json(registeredArtworks); // Respond with artworks as JSON
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error obtaining Artworks' });
    }
  },
  
  createArt: async (req, res) => {
    try {
      const registeredArtists = await db.Artist.findAll();
      res.json(registeredArtists); // Respond with artists as JSON
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Error obtaining artists: ${error.message}` });
    }
  },

  createArtwork: async (req, res) => {
    try {
      const newArtwork = req.body;
      const artworkImageUpload = req.files; 
      const firstImage = artworkImageUpload[0].filename;
  
      const cloudinaryImageUrl = `https://res.cloudinary.com/dpnrapsvi/image/upload/${firstImage}`;
  
      newArtwork.ArtistID = req.body.ArtistID;
  
      const newArtworkEntry = await db.Artwork.create({
        Title: newArtwork.Title,
        Description: newArtwork.Description,
        CreationDate: newArtwork.CreationDate,
        Price: newArtwork.Price,
        Image: cloudinaryImageUrl,
        ArtistID: newArtwork.ArtistID,
      });

      res.json({ message: "Artwork created successfully" }); // Respond with a JSON message
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Error publishing the artwork: ${error.message}` });
    }
  },
};

module.exports = artworksController;
