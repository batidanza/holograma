function obraDeArteTransaccionData(sequelize, DataTypes) {
  let aliasObraDeArteTransaccion = 'ObraDeArte_Transaccion'; // Nombre de la tabla

  let colsObraDeArteTransaccion = {
    IDObra: {
      type: DataTypes.INTEGER,
    },
    IDTransaccion: {
      type: DataTypes.INTEGER,
    },
  };

  let configObraDeArteTransaccion = {
    timestamps: false,
    tableName: 'ObraDeArte_Transaccion', // Nombre de la tabla existente en la base de datos
  };

  const ObraDeArteTransaccion = sequelize.define(
    aliasObraDeArteTransaccion,
    colsObraDeArteTransaccion,
    configObraDeArteTransaccion
  );

  ObraDeArteTransaccion.associate = function (modelos) {
    ObraDeArteTransaccion.belongsTo(modelos.ObraDeArte, {
      as: 'ObraDeArte',
      foreignKey: 'IDObra',
    });
    ObraDeArteTransaccion.belongsTo(modelos.Transaccion, {
      as: 'Transaccion',
      foreignKey: 'IDTransaccion',
    });
  };

  return ObraDeArteTransaccion;
}

module.exports = obraDeArteTransaccionData;
