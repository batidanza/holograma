const db = require('../database/models');

const artworksController = {

  //ARTWORK API AND METHODS

  artwork: async (req, res) => {
    try {
      const registeredArtworks = await db.Artwork.findAll({
        include: [{ model: db.Artist, as: 'Artist' }]
      });
      res.json(registeredArtworks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error obtaining Artworks' });
    }
  },

  createArt: async (req, res) => {
    try {
      const registeredArtists = await db.Artist.findAll();
      res.json(registeredArtists);
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
        Materials: newArtwork.Materials,
        Dimensions: newArtwork.Dimensions,
        ArtistID: newArtwork.ArtistID
      });

      res.json({ message: "Artwork created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Error publishing the artwork: ${error.message}` });
    }
  },

 
  getArtworkById: async (req, res) => {
    try {
      const artworkId = req.params.id;
      const artworkDetails = await db.Artwork.findByPk(artworkId, {
        include: [{ model: db.Artist, as: 'Artist' }]
      });

      if (!artworkDetails) {
        return res.status(404).json({ error: 'Artwork not found' });
      }

      res.json(artworkDetails);
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
  },


  //SKETCH APIS AND METHODS
  
  sketch: async (req, res) => {
    try {
      const sketches = await db.Sketch.findAll();
      res.json(sketches);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error obtaining sketches' });
    }
  },

  sketchById: async (req, res) => {
    try {
      const sketchId = req.params.sketchId;
      const sketch = await db.Sketch.findByPk(sketchId);
      res.json(sketch);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error obtaining sketch' });
    }
  },

  createSketch: async (req, res) => {
    try {
      const newSketch = req.body;
      const sketchImageUpload = req.files;
      const firstImage = sketchImageUpload[0].filename;
      const cloudinaryImageUrl = `https://res.cloudinary.com/dpnrapsvi/image/upload/${firstImage}`;
      newSketch.ArtistID = req.body.ArtistID;

      const newSketchEntry = await db.Sketch.create({
        Title: newSketch.Title,
        Image: cloudinaryImageUrl,
        ArtistID: newSketch.ArtistID
      });

      res.json({ message: "Artwork created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Error publishing the artwork: ${error.message}` });
    }
  },


};

module.exports = artworksController;
