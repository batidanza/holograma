function solicitudArtistaData(sequelize, DataTypes) {
  let aliasSolicitudArtista = 'SolicitudArtista'; // Nombre de la tabla

  let colsSolicitudArtista = {
    IDArtista: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PortafolioDescripcion: {
      type: DataTypes.TEXT,
    },
    FechaSolicitud: {
      type: DataTypes.DATE,
    },
    EstadoSolicitud: {
      type: DataTypes.ENUM('En revisión', 'Aprobado', 'Rechazado'),
      defaultValue: 'En revisión',
    },
  };

  let configSolicitudArtista = {
    timestamps: false,
    tableName: 'SolicitudArtista', // Nombre de la tabla existente en la base de datos
  };

  const SolicitudArtista = sequelize.define(
    aliasSolicitudArtista,
    colsSolicitudArtista,
    configSolicitudArtista
  );

  SolicitudArtista.associate = function (modelos) {
    SolicitudArtista.belongsTo(modelos.Artista, {
      as: 'Artista',
      foreignKey: 'IDArtista',
    });
    SolicitudArtista.hasMany(modelos.SolicitudArtistaGestionada, {
      as: 'SolicitudArtistaGestionada',
      foreignKey: 'IDSolicitudArtista',
    });
  };

  return SolicitudArtista;
}

module.exports = solicitudArtistaData;
