function artistData(sequelize, DataTypes) {
  let artistTableName = 'Artist'; 

  let artistColumns = {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BirthDate: {
      type: DataTypes.DATE,
    },
    Nationality: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ArtistDescription: {
      type: DataTypes.TEXT,
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    RequestStatus: {
      type: DataTypes.ENUM('Under review', 'Approved', 'Rejected'),
      defaultValue: 'Under review',
    },
  };

  let artistConfig = {
    timestamps: false,
    tableName: 'Artist', 
  };

  const Artist = sequelize.define(artistTableName, artistColumns, artistConfig);

  Artist.associate = function (models) {
    Artist.hasMany(models.ArtistRequest, {
      as: 'Requests',
      foreignKey: 'ArtistID',
    });
    Artist.hasMany(models.Exhibition, {
      as: 'Exhibitions',
      foreignKey: 'ArtistID',
    });
    Artist.hasMany(models.Artwork, {
      as: 'Artworks',
      foreignKey: 'ArtistID',
    });
    Artist.hasMany(models.ManagedArtistRequest, {
      as: 'ManagedRequests',
      foreignKey: 'ArtistID',
    });
    Artist.hasMany(models.Movie, {
      as: 'DirectedMovies',
      foreignKey: 'ArtistID',
    });
  };

  return Artist;
}

module.exports = artistData;
