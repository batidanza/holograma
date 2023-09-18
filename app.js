const express = require('express');
const db = require('./src/database/models'); 

const mainRoutes = require('./src/routes/mainRoutes')
const artistasRoutes = require('./src/routes/artistasRoutes'); 


const app = express ();
const path = require ('path');
const methodOverride = require('method-override');
const session = require('express-session');


app.use(express.static(path.resolve(__dirname, './public')));

app.set ('view engine', 'ejs');

app.use(express.urlencoded({extended: false})) /
app.use(express.json()) 
app.use(methodOverride("_method"))
app.use (session({secret:"clave secreta",
resave:false,
saveUninitialized:false,
}))

db.sequelize.sync()
  .then(() => {
    console.log('Tablas de la base de datos sincronizadas');
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
  });


app.use('/', mainRoutes);

app.use('/artistas', artistasRoutes);


app.use ('*', function (req, res){
  res.send("ruta erronea")
});

app.listen(3002, () => console.log('Esto fue exitoso'));

