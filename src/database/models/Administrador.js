/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Administrador = sequelize.define('Administrador', {
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Relaciones
Administrador.hasMany(SolicitudArtistaGestionada, { foreignKey: 'IDAdministrador' });

module.exports = Administrador;
*/