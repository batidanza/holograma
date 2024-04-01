function artworkData(sequelize, DataTypes) {
  let artworkTableName = 'Artwork'; 

  let artworkColumns = {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
    },
    CreationDate: {
      type: DataTypes.DATE,
    },
    Dimensions: {
      type: DataTypes.STRING(50),
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    Status: {
      type: DataTypes.ENUM('Under review', 'Published', 'Sold'),
      defaultValue: 'Under review',
    },
    ArtistID: {
      type: DataTypes.INTEGER,
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Materials: {
      type: DataTypes.STRING,
    },
    
  };

  let artworkConfig = {
    timestamps: false,
    tableName: 'Artwork',
  };

  const Artwork = sequelize.define(artworkTableName, artworkColumns, artworkConfig);

  Artwork.associate = function (models) {
    Artwork.belongsTo(models.Artist, {
      as: 'Artist',
      foreignKey: 'ArtistID',
    });
    Artwork.belongsToMany(models.Transaction, {
      through: 'ArtworkTransaction',
      foreignKey: 'ArtworkID',
    });
  };

  return Artwork;
}

module.exports = artworkData;
