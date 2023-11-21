function clientData(sequelize, DataTypes) {
  let clientTableName = 'Client'; // Name of the table

  let clientColumns = {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Address: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Phone: {
      type: DataTypes.STRING(15),
    },
  };

  let clientConfig = {
    timestamps: false,
    tableName: 'Client', // Name of the table in the database
  };

  const Client = sequelize.define(clientTableName, clientColumns, clientConfig);

  Client.associate = function (models) {
    Client.hasMany(models.Transaction, {
      as: 'Transactions',
      foreignKey: 'ClientID',
    });
  };

  return Client;
}

module.exports = clientData;
