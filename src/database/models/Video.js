function videoData(sequelize, DataTypes) {
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
    ArtistID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Artist',
        key: 'ID',
      },
    },
  };

  let videoConfig = {
    timestamps: false,
    tableName: 'Video',
  };

  const Video = sequelize.define(videoTableName, videoColumns, videoConfig);

  Video.associate = function (models) {
    Video.belongsTo(models.Artist, {
      as: 'Artist',
      foreignKey: 'ArtistID',
    });
  };

  return Video;
}

module.exports = videoData;
