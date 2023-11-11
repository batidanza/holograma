const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

const artistasController = {

  artistas: async (req, res) => {
    try {
      const artistasRegistrados = await db.Artista.findAll();
      res.json(artistasRegistrados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener Artistas' });
    }
  },
  
  detalleArtista: async (req, res) => {
    try {
      const ArtistaID = req.params.ID;
      const Artista = await db.Artista.findByPk(ArtistaID);

      if (!Artista) {
        return res.status(404).json({ error: "Artista no encontrado" });
      }

      res.json(Artista); // Enviando los detalles del artista como JSON
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los detalles del artista' });
    }
  },

  aplica: (req, res) => {
    res.json({ message: "OK" }); // Enviando respuesta JSON
  },

  solicitudAplicacion: async (req, res) => {
    try {
      const solicitudNueva = req.body;
      console.log("Valores recibidos en req.body:", solicitudNueva);
      const artistaimgUpload = req.files; 
      const primeraImagen = artistaimgUpload[0].filename;

      const imagenCloudinaryURL = `https://res.cloudinary.com/dpnrapsvi/image/upload/${primeraImagen}`;

      const nuevaSolicitud = await db.Artista.create({
        Nombre: solicitudNueva.Nombre,
        Email: solicitudNueva.Email,
        DescripcionArtista: solicitudNueva.DescripcionArtista,
        Imagen: imagenCloudinaryURL, 
      });
      
      res.json({ message: "Solicitud creada exitosamente" }); // Enviando respuesta JSON
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Error al crear la solicitud ${error.message}` });
    }
  },
}

module.exports = artistasController;
