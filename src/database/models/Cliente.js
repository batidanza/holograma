/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Direccion: {
    type: DataTypes.STRING,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Telefono: {
    type: DataTypes.STRING(15),
  },
});

// Relaciones
Cliente.hasMany(Transaccion, { foreignKey: 'IDCliente' });

module.exports = Cliente;
*/