const express = require('express');
const db = require('./src/database/models'); 

const artistsRoutes = require('./src/routes/artistsRoutes'); 
const artworksRoutes = require('./src/routes/artworksRoutes'); 

const app = express ();
const path = require ('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cors = require('cors');

app.use(express.static(path.resolve(__dirname, './public')));

app.set ('view engine', 'ejs');
app.use(cors());

app.use(express.urlencoded({extended: false})) /
app.use(express.json()) 
app.use(methodOverride("_method"))
app.use (session({secret:"clave secreta",
resave:false,
saveUninitialized:false,
}))

db.sequelize.sync()
  .then(() => {
    console.log('Synchronized database tables');
  })
  .catch((error) => {
    console.error('Error at synchronized database tables', error);
  });

app.use('/artists', artistsRoutes);

app.use('/artworks', artworksRoutes )

app.use ('*', function (req, res){
  res.send("WRONG ROUTE")
});

app.listen(3002, () => console.log('Server running'));