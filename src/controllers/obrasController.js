//const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

const obrasController = {

  obras: async (req, res) => {
    try {
      const obrasRegistradas = await db.ObraDeArte.findAll();
      res.render("obras", { obrasRegistradas });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener Obras');
    }
  },

  formCreate: (req, res) => {
    res.render("obraCreacion"); 
  },

  create: async (req, res) => {
    try {
      const obraNueva = req.body;
      const obraimgUpload = req.files; 
      const primeraImagen = obraimgUpload[0].filename;
  
      const imagenCloudinaryURL = `https://res.cloudinary.com/dpnrapsvi/image/upload/${primeraImagen}`;
  
      const nuevaObra = await db.ObraDeArte.create({
        Titulo: obraNueva.Titulo,
        Descripcion: obraNueva.Descripcion,
        FechaCreacion: obraNueva.FechaCreacion,
        Precio: obraNueva.Precio,
        Imagen: imagenCloudinaryURL, 
      });
      
      // Redirige a la página de "obras" después de crear la obra
      res.redirect("/obras/obras");
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error al publicar la obra: ${error.message}`);
    }
  }
  

}

module.exports = obrasController ;