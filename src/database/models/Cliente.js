function clienteData(sequelize, DataTypes) {
  let aliasCliente = 'Cliente'; // Nombre de la tabla

  let colsCliente = {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
  };

  let configCliente = {
    timestamps: false,
    tableName: 'Cliente', // Nombre de la tabla existente en la base de datos
  };

  const Cliente = sequelize.define(aliasCliente, colsCliente, configCliente);

  Cliente.associate = function (modelos) {
    Cliente.hasMany(modelos.Transaccion, {
      as: 'Transaccion',
      foreignKey: 'IDCliente',
    });
  };

  return Cliente;
}

module.exports = clienteData;
