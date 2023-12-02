function transactionData(sequelize, DataTypes) {
  let transactionTableName = 'Transaction'; 

  let transactionColumns = {
    TransactionDate: {
      type: DataTypes.DATE,
    },
    ClientID: {
      type: DataTypes.INTEGER,
    },
    ArtworkID: {
      type: DataTypes.INTEGER,
    },
    TotalTransaction: {
      type: DataTypes.DECIMAL(10, 2),
    },
    SalesCommission: {
      type: DataTypes.DECIMAL(10, 2),
    },
  };

  let transactionConfig = {
    timestamps: false,
    tableName: 'Transaction', 
  };

  const Transaction = sequelize.define(transactionTableName, transactionColumns, transactionConfig);

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.Client, {
      as: 'Client',
      foreignKey: 'ClientID',
    });
    Transaction.belongsToMany(models.Artwork, {
      through: 'ArtworkTransaction',
      foreignKey: 'TransactionID',
    });
  };

  return Transaction;
}

module.exports = transactionData;
