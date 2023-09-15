function solicitudArtistaGestionadaData(sequelize, DataTypes) {
  let aliasSolicitudArtistaGestionada = 'SolicitudArtistaGestionada'; // Nombre de la tabla

  let colsSolicitudArtistaGestionada = {
    IDArtista: {
      type: DataTypes.INTEGER,
    },
    IDAdministrador: {
      type: DataTypes.INTEGER,
    },
    Comentario: {
      type: DataTypes.TEXT,
    },
    EstadoGestion: {
      type: DataTypes.ENUM('En revisión', 'Aprobado', 'Rechazado'),
      defaultValue: 'En revisión',
    },
  };

  let configSolicitudArtistaGestionada = {
    timestamps: false,
    tableName: 'SolicitudArtistaGestionada', // Nombre de la tabla existente en la base de datos
  };

  const SolicitudArtistaGestionada = sequelize.define(
    aliasSolicitudArtistaGestionada,
    colsSolicitudArtistaGestionada,
    configSolicitudArtistaGestionada
  );

  SolicitudArtistaGestionada.associate = function (modelos) {
    SolicitudArtistaGestionada.belongsTo(modelos.Artista, {
      as: 'Artista',
      foreignKey: 'IDArtista',
    });
    SolicitudArtistaGestionada.belongsTo(modelos.Administrador, {
      as: 'Administrador',
      foreignKey: 'IDAdministrador',
    });
  };

  return SolicitudArtistaGestionada;
}

module.exports = solicitudArtistaGestionadaData;
