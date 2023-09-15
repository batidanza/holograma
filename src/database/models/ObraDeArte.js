/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ObraDeArte = sequelize.define('ObraDeArte', {
  Titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Descripcion: {
    type: DataTypes.TEXT,
  },
  FechaCreacion: {
    type: DataTypes.DATE,
  },
  Dimensiones: {
    type: DataTypes.STRING(50),
  },
  Precio: {
    type: DataTypes.DECIMAL(10, 2),
  },
  Estado: {
    type: DataTypes.ENUM('En revisión', 'Publicada', 'Vendida'),
    defaultValue: 'En revisión',
  },
  IDArtista: {
    type: DataTypes.INTEGER,
  },
});

// Relaciones
ObraDeArte.belongsTo(Artista, { foreignKey: 'IDArtista' });
ObraDeArte.belongsToMany(Transaccion, { through: 'ObraDeArte_Transaccion', foreignKey: 'IDObra' });

module.exports = ObraDeArte;
*/