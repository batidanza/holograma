/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaccion = sequelize.define('Transaccion', {
  FechaTransaccion: {
    type: DataTypes.DATE,
  },
  IDCliente: {
    type: DataTypes.INTEGER,
  },
  IDObra: {
    type: DataTypes.INTEGER,
  },
  TotalTransaccion: {
    type: DataTypes.DECIMAL(10, 2),
  },
  ComisionVenta: {
    type: DataTypes.DECIMAL(10, 2),
  },
});

// Relaciones
Transaccion.belongsTo(Cliente, { foreignKey: 'IDCliente' });
Transaccion.belongsToMany(ObraDeArte, { through: 'ObraDeArte_Transaccion', foreignKey: 'IDTransaccion' });

module.exports = Transaccion;
*/