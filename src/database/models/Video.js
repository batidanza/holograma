function videoData(sequelize, DataTypes) {
  let videoTableName = 'Video'; 

  let videoColumns = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    VideoFile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  let videoConfig = {
    timestamps: false,
    tableName: 'Video', 
  };

  const Video = sequelize.define(videoTableName, videoColumns, videoConfig);

  // Puedes definir asociaciones aquí si es necesario

  return Video;
}

module.exports = videoData;
