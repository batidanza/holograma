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
      allowNull: true,
    },
    PhoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
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

    // Define the association with the Media model
    User.hasMany(models.Media, {
      as: 'Media',
      foreignKey: 'UserID',
    });
  };

  return User;
}

module.exports = userData;
