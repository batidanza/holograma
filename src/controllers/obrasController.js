//const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

const obrasController = {

  sketchControl: (req, res) => {
    
      res.render("sketches")

  },


  obras: async (req, res) => {
    try {
      const obrasRegistradas = await db.ObraDeArte.findAll({
        include: [{ model: db.Artista, as: 'Artista' }]
      });
      res.render("obras", { obrasRegistradas });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener Obras');
    }
  },
  
  formCreate: async (req, res) => {
    try {
      // Aquí, obtén la lista de artistas y almacénala en artistasRegistrados
      const artistasRegistrados = await db.Artista.findAll();
  
      // Renderiza la vista y pasa artistasRegistrados como una variable
      res.render("obraCreacion", { artistasRegistrados });
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error al obtener artistas: ${error.message}`);
    }
  }
  ,

  create: async (req, res) => {
    try {
      const obraNueva = req.body;
      const obraimgUpload = req.files; 
      const primeraImagen = obraimgUpload[0].filename;
  
      // Genera la URL de Cloudinary para la imagen
      const imagenCloudinaryURL = `https://res.cloudinary.com/dpnrapsvi/image/upload/${primeraImagen}`;
  
      // Agrega la propiedad IDArtista con el ID del artista seleccionado en el formulario
      obraNueva.IDArtista = req.body.IDArtista; // Debes usar req.body.IDArtista, ya que el name del select es "IDArtista"
  
      const nuevaObra = await db.ObraDeArte.create({
        Titulo: obraNueva.Titulo,
        Descripcion: obraNueva.Descripcion,
        FechaCreacion: obraNueva.FechaCreacion,
        Precio: obraNueva.Precio,
        Imagen: imagenCloudinaryURL,
        IDArtista: obraNueva.IDArtista, // Establece la relación con el artista
      });
  console.log(req.body)
      // Redirige a la página de "obras" después de crear la obra
      res.redirect("/obras/obras");
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error al publicar la obra: ${error.message}`);
    }
  },
  
  


}

module.exports = obrasController ;