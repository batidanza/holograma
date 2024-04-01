function artworkTransactionData(sequelize, DataTypes) {
  let artworkTransactionTableName = 'ArtworkTransaction'; 

  let artworkTransactionColumns = {
    ArtworkID: {
      type: DataTypes.INTEGER,
    },
    TransactionID: {
      type: DataTypes.INTEGER,
    },
  };

  let artworkTransactionConfig = {
    timestamps: false,
    tableName: 'ArtworkTransaction',
  };

  const ArtworkTransaction = sequelize.define(
    artworkTransactionTableName,
    artworkTransactionColumns,
    artworkTransactionConfig
  );

  ArtworkTransaction.associate = function (models) {
    ArtworkTransaction.belongsTo(models.Artwork, {
      as: 'Artwork',
      foreignKey: 'ArtworkID',
    });
    ArtworkTransaction.belongsTo(models.Transaction, {
      as: 'Transaction',
      foreignKey: 'TransactionID',
    });
  };

  return ArtworkTransaction;
}

module.exports = artworkTransactionData;
