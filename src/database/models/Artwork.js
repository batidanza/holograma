function artworkData(sequelize, DataTypes) {
  let artworkTableName = 'Artwork'; // Name of the table

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
      type: DataTypes.STRING(50), // Ajusta el tipo de dato según tus necesidades
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
      type: DataTypes.STRING, // You can adjust the data type according to your needs (STRING is common for image URLs)
      allowNull: false, // Set the NOT NULL condition
    },
    Materials: {
      type: DataTypes.STRING, // Puedes ajustar el tipo de dato según tus necesidades
    },
    
  };

  let artworkConfig = {
    timestamps: false,
    tableName: 'Artwork', // Name of the table in the database
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
