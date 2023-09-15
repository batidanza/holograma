/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SolicitudArtistaGestionada = sequelize.define('SolicitudArtistaGestionada', {
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
});

// Relaciones
SolicitudArtistaGestionada.belongsTo(Artista, { foreignKey: 'IDArtista' });
SolicitudArtistaGestionada.belongsTo(Administrador, { foreignKey: 'IDAdministrador' });

module.exports = SolicitudArtistaGestionada;
*/