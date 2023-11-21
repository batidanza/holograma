function managedArtistRequestData(sequelize, DataTypes) {
  let managedArtistRequestTableName = 'ManagedArtistRequest'; // Name of the table

  let managedArtistRequestColumns = {
    ArtistID: {
      type: DataTypes.INTEGER,
    },
    AdministratorID: {
      type: DataTypes.INTEGER,
    },
    Comment: {
      type: DataTypes.TEXT,
    },
    ManagementStatus: {
      type: DataTypes.ENUM('Under review', 'Approved', 'Rejected'),
      defaultValue: 'Under review',
    },
  };

  let managedArtistRequestConfig = {
    timestamps: false,
    tableName: 'ManagedArtistRequest', // Name of the table in the database
  };

  const ManagedArtistRequest = sequelize.define(
    managedArtistRequestTableName,
    managedArtistRequestColumns,
    managedArtistRequestConfig
  );

  ManagedArtistRequest.associate = function (models) {
    ManagedArtistRequest.belongsTo(models.Artist, {
      as: 'Artist',
      foreignKey: 'ArtistID',
    });
    ManagedArtistRequest.belongsTo(models.Administrator, {
      as: 'Administrator',
      foreignKey: 'AdministratorID',
    });
  };

  return ManagedArtistRequest;
}

module.exports = managedArtistRequestData;
