const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

const artistsController = {

  artists: async (req, res) => {
    try {
      const registeredArtists = await db.Artist.findAll();
      res.json(registeredArtists);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error obtaining Artists' });
    }
  },
  
  artistDetail: async (req, res) => {
    try {
      const artistID = req.params.ID;
      const artist = await db.Artist.findByPk(artistID);

      if (!artist) {
        return res.status(404).json({ error: "Artist not found" });
      }

      res.json(artist); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error obtaining artist details' });
    }
  },

  apply: (req, res) => {
    res.json({ message: "OK" }); 
  },

  applicationRequest: async (req, res) => {
    try {
      const newRequest = req.body;
      console.log("Values received in req.body:", newRequest);
      const artistImageUpload = req.files; 
      const firstImage = artistImageUpload[0].filename;

      const cloudinaryImageUrl = `https://res.cloudinary.com/dpnrapsvi/image/upload/${firstImage}`;

      const newApplication = await db.Artist.create({
        Name: newRequest.Name,
        Email: newRequest.Email,
        ArtistDescription: newRequest.ArtistDescription,
        Image: cloudinaryImageUrl, 
      });
      
      res.json({ message: "Application created successfully" }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Error creating the application ${error.message}` });
    }
  },
}

module.exports = artistsController;
