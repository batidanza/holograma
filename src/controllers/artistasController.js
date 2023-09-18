//const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

const artistasController = {
  artistas: async (req, res) => {
    try {
      const artistasRegistrados = await db.Artista.findAll();
      res.render("artistas", { artistasRegistrados });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener Artistas');
    }
  },



  aplica: (req, res) => {

    res.render("aplicacionArtistas");
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
      
      res.redirect("/artistas/artistas");
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error al crear la solicitud ${error.message}`);
    }
  },
}


module.exports = artistasController ;
