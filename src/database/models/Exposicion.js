/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Exposicion = sequelize.define('Exposicion', {
  Titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Descripcion: {
    type: DataTypes.TEXT,
  },
  FechaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  FechaFin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Ubicacion: {
    type: DataTypes.STRING,
  },
  Estado: {
    type: DataTypes.ENUM('Planificada', 'En curso', 'Finalizada'),
    defaultValue: 'Planificada',
  },
  Imagen: {
    type: DataTypes.STRING,
  },
  IDArtista: {
    type: DataTypes.INTEGER,
  },
});

// Relaciones
Exposicion.belongsTo(Artista, { foreignKey: 'IDArtista' });

module.exports = Exposicion;
*/