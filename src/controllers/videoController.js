const db = require("../database/models");

const createVideo = async (req, res) => {
  try {
    const videoFileUpload = req.file;

    if (!videoFileUpload) {
      return res.status(400).json({ error: "No video file provided" });
    }

    console.log("videoFileUpload:", videoFileUpload);

    // Use videoFileUpload.path directly for the VideoFile field
    const videoUrl = videoFileUpload.path;

    // Assuming you have a Video model in your database
    const newVideoEntry = await db.Video.create({
      VideoFile: videoUrl,
      // Add other video-related fields as needed
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

module.exports = {
  createVideo,
  getVideos,
};
  