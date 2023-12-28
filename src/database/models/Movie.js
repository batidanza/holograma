// ... (código existente)

function movieData(sequelize, DataTypes) {
  let movieTableName = 'Movie';

  let movieColumns = {
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
    ReleaseDate: {
      type: DataTypes.DATE,
    },
    Genre: {
      type: DataTypes.STRING,
    },
   ArtistID: {  // Cambiado el nombre de la columna
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    Duration: {
      type: DataTypes.INTEGER,
    },
    VideoURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },  
    ThumbnailURL: {
      type: DataTypes.STRING,
    },
  };

  let movieConfig = {
    timestamps: false,
    tableName: 'Movie',
  };

  const Movie = sequelize.define(movieTableName, movieColumns, movieConfig);
  
  Movie.associate = function (models) {
    Movie.belongsTo(models.Artist, {
      as: 'Director',
      foreignKey: 'ArtistID',  // Actualiza el nombre del campo aquí
    });
  };

  return Movie;
}

module.exports = movieData;
