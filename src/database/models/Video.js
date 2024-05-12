const { DataTypes } = require('sequelize');

function videoData(sequelize) {
  let videoTableName = 'Video';

  let videoColumns = {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false, 
    },
    VideoFile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    VideoFile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    StreamingUrl: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Director: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
  };

  let videoConfig = {
    timestamps: false,
    tableName: 'Video',
  };

  const Video = sequelize.define(videoTableName, videoColumns, videoConfig);


  return Video;
}

module.exports = videoData;
