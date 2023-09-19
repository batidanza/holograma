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

}

module.exports = obrasController ;