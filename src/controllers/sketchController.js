const db = require("../database/models");

const getSketches = async (req, res) => {
  try {
    const sketches = await db.Sketch.findAll();
    res.json(sketches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obtaining sketches" });
  }
};

const getSketchById = async (req, res) => {
  try {
    const sketchId = req.params.sketchId;
    const sketch = await db.Sketch.findByPk(sketchId);
    res.json(sketch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obtaining sketch" });
  }
};

const createSketch = async (req, res) => {
  try {
    const newSketch = req.body;
    const sketchImageUpload = req.files;
    const firstImage = sketchImageUpload[0].filename;
    const cloudinaryImageUrl = `https://res.cloudinary.com/dpnrapsvi/image/upload/${firstImage}`;
    newSketch.ArtistID = req.body.ArtistID;

    const newSketchEntry = await db.Sketch.create({
      Title: newSketch.Title,
      Instructions: newSketch.Instructions,
      Description: newSketch.Description,
      Image: cloudinaryImageUrl,
      ArtistID: newSketch.ArtistID,
    });

    res.json({ message: "Sketch created successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error publishing the sketch: ${error.message}` });
  }
};

module.exports = {
  getSketches,
  getSketchById,
  createSketch,
};
