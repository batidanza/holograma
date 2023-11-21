function artistRequestData(sequelize, DataTypes) {
  let artistRequestTableName = 'ArtistRequest'; // Name of the table

  let artistRequestColumns = {
    ArtistID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PortfolioDescription: {
      type: DataTypes.TEXT,
    },
    RequestDate: {
      type: DataTypes.DATE,
    },
    RequestStatus: {
      type: DataTypes.ENUM('Under review', 'Approved', 'Rejected'),
      defaultValue: 'Under review',
    },
  };

  let artistRequestConfig = {
    timestamps: false,
    tableName: 'ArtistRequest', // Name of the table in the database
  };

  const ArtistRequest = sequelize.define(
    artistRequestTableName,
    artistRequestColumns,
    artistRequestConfig
  );

  ArtistRequest.associate = function (models) {
    ArtistRequest.belongsTo(models.Artist, {
      as: 'Artist',
      foreignKey: 'ArtistID',
    });
    ArtistRequest.hasMany(models.ManagedArtistRequest, {
      as: 'ManagedArtistRequests',
      foreignKey: 'ArtistRequestID',
    });
  };

  return ArtistRequest;
}

module.exports = artistRequestData;
