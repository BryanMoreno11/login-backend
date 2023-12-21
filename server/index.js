const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
//rutas
//importamos las rutas del archivo usuarioRoute que serán utilizadas bajo el prefijo api
var usuario_routes = require('./routes/usuarioRoute');
app.use('/api', usuario_routes);
//arrancar el servidor
app.listen("3000");
console.log("server up localhost:3000");