function artistaData(sequelize, DataTypes) {
  let aliasArtista = 'Artista'; // Nombre de la tabla

  let colsArtista = {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FechaNacimiento: {
      type: DataTypes.DATE,
    },
    Nacionalidad: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
    DescripcionArtista: {
      type: DataTypes.TEXT,
    },
    Imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EstadoSolicitud: {
      type: DataTypes.ENUM('En revisión', 'Aprobado', 'Rechazado'),
      defaultValue: 'En revisión',
    },
  };

  let configArtista = {
    timestamps: false,
    tableName: 'Artista', // Nombre de la tabla existente en la base de datos
  };

  const Artista = sequelize.define(aliasArtista, colsArtista, configArtista);

  Artista.associate = function (modelos) {
    Artista.hasMany(modelos.SolicitudArtista, {
      as: 'Solicitud',
      foreignKey: 'IDArtista',
    });
    Artista.hasMany(modelos.Exposicion, {
      as: 'Exposicion',
      foreignKey: 'IDArtista',
    });
    Artista.hasMany(modelos.ObraDeArte, {
      as: 'ObraDeArte',
      foreignKey: 'IDArtista',
    });
    Artista.hasMany(modelos.SolicitudArtistaGestionada, {
      as: 'SolicitudArtistaGestionada',
      foreignKey: 'IDArtista',
    });
  };

  return Artista;
}

module.exports = artistaData;
