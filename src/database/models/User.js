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
    FirstName: {
      type: DataTypes.STRING,
    },
    LastName: {
      type: DataTypes.STRING,
    },
    DateOfBirth: {
      type: DataTypes.DATE,
    },
    Gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Other'),
    },
    Address: {
      type: DataTypes.STRING,
    },
    PhoneNumber: {
      type: DataTypes.STRING(20),
    },
    ProfileImageURL: {
      type: DataTypes.STRING,
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
