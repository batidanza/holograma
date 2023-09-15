function administradorData(sequelize, DataTypes) {
  let aliasAdministrador = 'Administrador'; // Nombre de la tabla

  let colsAdministrador = {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  let configAdministrador = {
    timestamps: false,
    tableName: 'Administrador', // Nombre de la tabla existente en la base de datos
  };

  const Administrador = sequelize.define(aliasAdministrador, colsAdministrador, configAdministrador);

  Administrador.associate = function (modelos) {
    Administrador.hasMany(modelos.SolicitudArtistaGestionada, {
      as: 'SolicitudArtistaGestionada',
      foreignKey: 'IDAdministrador',
   });
  };

  return Administrador;
} 

module.exports = administradorData;
