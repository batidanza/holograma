function mediaData(sequelize, DataTypes) {
  let mediaTableName = 'Media';

  let mediaColumns = {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UploadDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  };

  let mediaConfig = {
    timestamps: false,
    tableName: 'Media',
  };

  const Media = sequelize.define(mediaTableName, mediaColumns, mediaConfig);

  Media.associate = function(models) {

    Media.belongsTo(models.User, {
      foreignKey: 'UserID',
      as: 'User'
    });
  };

  return Media;
}

module.exports = mediaData;