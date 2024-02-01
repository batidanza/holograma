function userData(sequelize, DataTypes) {
  let userTableName = 'User';

  let userColumns = {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    DateOfBirth: {
      type: DataTypes.DATE,
    },
    PhoneNumber: {
      type: DataTypes.STRING(20),
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  let userConfig = {
    timestamps: false,
    tableName: 'User',
  };

  const User = sequelize.define(userTableName, userColumns, userConfig);

  User.associate = function (models) {
    User.hasMany(models.Transaction, {
      as: 'Transactions',
      foreignKey: 'ClientID',
    });

    User.hasMany(models.ManagedArtistRequest, {
      as: 'ManagedArtistRequests',
      foreignKey: 'AdministratorID',
    });

    
    User.hasMany(models.ArtistRequest, {
      as: 'Requests',
      foreignKey: 'ArtistID',
    });
  };

  return User;
}

module.exports = userData;
