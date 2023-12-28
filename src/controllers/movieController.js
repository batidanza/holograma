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
    const {
      Title,
      Description,
      ReleaseDate,
      Genre,
      DirectorID,
      Duration,
      ThumbnailURL,
    } = req.body;
    const VideoUpload = req.file;
    const VideoURL = `https://res.cloudinary.com/dpnrapsvi/video/upload/${VideoUpload.filename}`;

    // Asegúrate de asignar un valor al campo DirectorID
    // Puedes obtenerlo desde el cuerpo de la solicitud o de donde sea apropiado en tu lógica
    const ArtistID = DirectorID;

    const newMovie = await Movie.create({
      Title,
      Description,
      ReleaseDate,
      Genre,
      ArtistID,
      Duration,
      VideoURL,
      ThumbnailURL,
    });

    res
      .status(201)
      .json({ message: "Movie created successfully", movie: newMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating the movie" });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
};
