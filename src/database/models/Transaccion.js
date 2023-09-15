function transaccionData(sequelize, DataTypes) {
  let aliasTransaccion = 'Transaccion'; // Nombre de la tabla

  let colsTransaccion = {
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
  };

  let configTransaccion = {
    timestamps: false,
    tableName: 'Transaccion', // Nombre de la tabla existente en la base de datos
  };

  const Transaccion = sequelize.define(aliasTransaccion, colsTransaccion, configTransaccion);

  Transaccion.associate = function (modelos) {
    Transaccion.belongsTo(modelos.Cliente, {
      as: 'Cliente',
      foreignKey: 'IDCliente',
    });
    Transaccion.belongsToMany(modelos.ObraDeArte, {
      through: 'ObraDeArte_Transaccion',
      foreignKey: 'IDTransaccion',
    });
  };

  return Transaccion;
}

module.exports = transaccionData;
