const db = require("../database/models");

const createVideo = async (req, res) => {
  try {
    const videoFileUpload = req.file;

    if (!videoFileUpload) {
      return res.status(400).json({ error: "No video file provided" });
    }

    const { Title, Duration, Description, Director, ArtistID } = req.body;

    const videoUrl = videoFileUpload.path;
    
    const newVideoEntry = await db.Video.create({
      VideoFile: videoUrl,
      Title: Title,
      Duration: Duration,
      Description: Description,
      Director: Director,
      ArtistID: ArtistID, 
    });

    res.status(201).json({ message: "Video created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating the video" });
  }
};

const getVideos = async (req, res) => {
  try {
    const videos = await db.Video.findAll();
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obtaining videos" });
  }
};

const getVideosById = async (req, res) => {
  try {
    const videoId = req.params.id;
    const videoDetails = await db.Video.findByPk(videoId, {
      include: [{ model: db.Artist, as: "Artist" }],
    });

    if (!videoDetails) {
      return res.status(404).json({ error: "Video not found" }); 
    }

    res.json(videoDetails);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error obtaining Video details: ${error.message}` });
  }
};

module.exports = {
  createVideo,
  getVideos,
  getVideosById
};
