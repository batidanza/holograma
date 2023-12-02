function administratorData(sequelize, DataTypes) {
  let adminTableName = 'Administrator';

  let adminColumns = {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  let adminConfig = {
    timestamps: false,
    tableName: 'Administrator', 
  };

  const Administrator = sequelize.define(adminTableName, adminColumns, adminConfig);

  Administrator.associate = function (models) {
    Administrator.hasMany(models.ManagedArtistRequest, {
      as: 'ManagedArtistRequests',
      foreignKey: 'AdministratorID',
    });
  };

  return Administrator;
}

module.exports = administratorData;
