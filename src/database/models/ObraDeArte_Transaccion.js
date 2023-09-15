/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ObraDeArte_Transaccion = sequelize.define('ObraDeArte_Transaccion', {
  IDObra: {
    type: DataTypes.INTEGER,
  },
  IDTransaccion: {
    type: DataTypes.INTEGER,
  },
});

// Relaciones
ObraDeArte_Transaccion.belongsTo(ObraDeArte, { foreignKey: 'IDObra' });
ObraDeArte_Transaccion.belongsTo(Transaccion, { foreignKey: 'IDTransaccion' });

module.exports = ObraDeArte_Transaccion;
*/