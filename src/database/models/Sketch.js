function sketchData(sequelize, DataTypes) {
    let sketchTableName = 'Sketch';
  
    let sketchColumns = {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      Instructions: {
        type: DataTypes.TEXT, 
      },
            
      Description: {
        type: DataTypes.TEXT, 
      },
      
      Image: {
        type: DataTypes.STRING,
      },
   
      ArtistID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    };
  
    let sketchConfig = {
      timestamps: false,
      tableName: 'Sketch', 
    };
  
    const Sketch = sequelize.define(sketchTableName, sketchColumns, sketchConfig);
  
    Sketch.associate = function (models) {
      Sketch.belongsTo(models.Artist, {
        as: 'Artist',
        foreignKey: 'ArtistID',
      });
    };
  
    return Sketch;
  }
  
  module.exports = sketchData;