/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SolicitudArtista = sequelize.define('SolicitudArtista', {
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
});

// Relaciones
SolicitudArtista.belongsTo(Artista, { foreignKey: 'IDArtista' });
SolicitudArtista.hasMany(SolicitudArtistaGestionada, { foreignKey: 'IDSolicitudArtista' });

module.exports = SolicitudArtista;
*/