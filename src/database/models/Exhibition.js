function exhibitionData(sequelize, DataTypes) {
  let exhibitionTableName = 'Exhibition'

  let exhibitionColumns = {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
    },
    StartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    EndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Location: {
      type: DataTypes.STRING,
    },
    Status: {
      type: DataTypes.ENUM('Planned', 'In progress', 'Completed'),
      defaultValue: 'Planned',
    },
    Image: {
      type: DataTypes.STRING,
    },
    ArtistID: {
      type: DataTypes.INTEGER,
    },
  };

  let exhibitionConfig = {
    timestamps: false,
    tableName: 'Exhibition', 
  };

  const Exhibition = sequelize.define(exhibitionTableName, exhibitionColumns, exhibitionConfig);

  Exhibition.associate = function (models) {
    Exhibition.belongsTo(models.Artist, {
      as: 'Artist',
      foreignKey: 'ArtistID',
    });
  };

  return Exhibition;
}

module.exports = exhibitionData;
