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
      console.log('req.body:', req.body); 
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
        Materials: newArtwork.Materials,
        Dimensions: newArtwork.Dimensions,
        ArtistID: newArtwork.ArtistID,

      });

      res.json({ message: "Artwork created successfully" }); // Respond with a JSON message
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Error publishing the artwork: ${error.message}` });
    }
  },

 getArtworkById: async (req, res) => {
    try {
      const artworkId = req.params.id; // Obtén el ID de la obra de los parámetros de la solicitud
      const artworkDetails = await db.Artwork.findByPk(artworkId, {
        include: [{ model: db.Artist, as: 'Artist' }]
      });

      if (!artworkDetails) {
        return res.status(404).json({ error: 'Artwork not found' });
      }

      res.json(artworkDetails); // Responde con los detalles de la obra como JSON
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Error obtaining Artwork details: ${error.message}` });
    }
  },

   getArtworksByArtist: async (req, res) => {
    try {
      const artistId = req.params.artistId;
      const artworks = await db.Artwork.findAll({ where: { ArtistID: artistId } });
  
      res.json(artworks);
    } catch (error) {
      console.error(`Error obtaining artworks for artist with ID ${artistId}:`, error);
      res.status(500).json({ error: 'Error obtaining artworks for artist' });
    }
  }
};



module.exports = artworksController;
