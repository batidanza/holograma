//const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

const obrasController = {
  sketchControl: (req, res) => {
    res.json({ message: "OK" }); // Responde con un mensaje JSON
  },

  obras: async (req, res) => {
    try {
      const obrasRegistradas = await db.ObraDeArte.findAll({
        include: [{ model: db.Artista, as: 'Artista' }]
      });
      res.json(obrasRegistradas); // Responde con las obras como JSON
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener Obras' });
    }
  },
  
  formCreate: async (req, res) => {
    try {
      const artistasRegistrados = await db.Artista.findAll();
      res.json(artistasRegistrados); // Responde con los artistas como JSON
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Error al obtener artistas: ${error.message}` });
    }
  },

  create: async (req, res) => {
    try {
      const obraNueva = req.body;
      const obraimgUpload = req.files; 
      const primeraImagen = obraimgUpload[0].filename;
  
      const imagenCloudinaryURL = `https://res.cloudinary.com/dpnrapsvi/image/upload/${primeraImagen}`;
  
      obraNueva.IDArtista = req.body.IDArtista;
  
      const nuevaObra = await db.ObraDeArte.create({
        Titulo: obraNueva.Titulo,
        Descripcion: obraNueva.Descripcion,
        FechaCreacion: obraNueva.FechaCreacion,
        Precio: obraNueva.Precio,
        Imagen: imagenCloudinaryURL,
        IDArtista: obraNueva.IDArtista,
      });

      res.json({ message: "Solicitud creada exitosamente" }); // Responde con un mensaje JSON
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Error al publicar la obra: ${error.message}` });
    }
  },
};

module.exports = obrasController;
