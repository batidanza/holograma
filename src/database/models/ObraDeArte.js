function obraDeArteData(sequelize, DataTypes) {
  let aliasObraDeArte = 'ObraDeArte'; // Nombre de la tabla

  let colsObraDeArte = {
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
    FechaCreacion: {
      type: DataTypes.DATE,
    },
    Dimensiones: {
      type: DataTypes.STRING(50),
    },
    Precio: {
      type: DataTypes.DECIMAL(10, 2),
    },
    Estado: {
      type: DataTypes.ENUM('En revisión', 'Publicada', 'Vendida'),
      defaultValue: 'En revisión',
    },
    IDArtista: {
      type: DataTypes.INTEGER,
    },
  };

  let configObraDeArte = {
    timestamps: false,
    tableName: 'ObraDeArte', // Nombre de la tabla existente en la base de datos
  };

  const ObraDeArte = sequelize.define(aliasObraDeArte, colsObraDeArte, configObraDeArte);

  ObraDeArte.associate = function (modelos) {
    ObraDeArte.belongsTo(modelos.Artista, {
      as: 'Artista',
      foreignKey: 'IDArtista',
    });
    ObraDeArte.belongsToMany(modelos.Transaccion, {
      through: 'ObraDeArte_Transaccion',
      foreignKey: 'IDObra',
    });
  };

  return ObraDeArte;
}

module.exports = obraDeArteData;
