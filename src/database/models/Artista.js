/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artista = sequelize.define('Artista', {
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  FechaNacimiento: {
    type: DataTypes.DATE,
  },
  Nacionalidad: {
    type: DataTypes.STRING,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DescripcionArtista: {
    type: DataTypes.TEXT,
  },
  Imagen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  EstadoSolicitud: {
    type: DataTypes.ENUM('En revisión', 'Aprobado', 'Rechazado'),
    defaultValue: 'En revisión',
  },
});

// Relaciones
Artista.hasMany(SolicitudArtista, { foreignKey: 'IDArtista' });
Artista.hasMany(Exposicion, { foreignKey: 'IDArtista' });
Artista.hasMany(ObraDeArte, { foreignKey: 'IDArtista' });
Artista.hasMany(SolicitudArtistaGestionada, { foreignKey: 'IDArtista' });

module.exports = Artista;
*/