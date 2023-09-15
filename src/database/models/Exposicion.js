function exposicionData(sequelize, DataTypes) {
  let aliasExposicion = 'Exposicion'; // Nombre de la tabla

  let colsExposicion = {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descripcion: {
      type: DataTypes.TEXT,
    },
    FechaInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    FechaFin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Ubicacion: {
      type: DataTypes.STRING,
    },
    Estado: {
      type: DataTypes.ENUM('Planificada', 'En curso', 'Finalizada'),
      defaultValue: 'Planificada',
    },
    Imagen: {
      type: DataTypes.STRING,
    },
    IDArtista: {
      type: DataTypes.INTEGER,
    },
  };

  let configExposicion = {
    timestamps: false,
    tableName: 'Exposicion', // Nombre de la tabla existente en la base de datos
  };

  const Exposicion = sequelize.define(aliasExposicion, colsExposicion, configExposicion);

  Exposicion.associate = function (modelos) {
    Exposicion.belongsTo(modelos.Artista, {
      as: 'Artista',
      foreignKey: 'IDArtista',
    });
  };

  return Exposicion;
}

module.exports = exposicionData;
