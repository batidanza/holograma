// movieController.js
const db = require("../database/models");

const getMovies = async (req, res) => {
  try {
    const movies = await db.Movie.findAll();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error obtaining movies: ${error.message}` });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movieDetails = await db.Movie.findByPk(movieId);

    if (!movieDetails) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json(movieDetails);
  } catch (error) {
    res.status(500).json({ error: "Error obtaining Movie details" });
  }
};


const createMovie = async (req, res) => {
  try {
    const newVideo = req.body;
    const videoUpload = req.files;
    const firstVideo = videoUpload[0].filename;
    const cloudinaryVideoUrl = `https://res.cloudinary.com/dpnrapsvi/image/upload/${firstVideo}`;
    newVideo.ArtistID = req.body.ArtistID;

    const newVideoEntry = await db.Movie.create({
      Title: newVideo.Title,
      Description: newVideo.Description,
      RealiseDate: newVideo.RealiseDate,
      VideoURL: cloudinaryVideoUrl,
      ThumbnailURL:newVideo.ThumbnailURL,
      Duration: newVideo.Duration,
      Genre: newVideo.Genre,
      ArtistID: newVideo.ArtistID,
    });

    res.json({ message: "Artwork created successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error publishing the artwork: ${error.message}` });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
};
