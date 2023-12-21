const { Router } = require('express');
const router = new Router();
//Extraemos las funciones del controller
//->Extraer funciones de la tabla Usuario
var { getUsuarios, getUsuario, updateUsuario, deleteUsuario, createUsuario, verificarUsuario } = require('../controllers/usuarioController');
//definimos las rutas de los endpoints y que función realizará
//->Rutas para la tabla franquicia
router.get('/usuarios', getUsuarios);
router.get('/usuario/:id', getUsuario);
router.post('/verificarUsuario', verificarUsuario);
router.post('/usuario', createUsuario);
router.put('/usuario/:id', updateUsuario)
router.delete('/usuario/:id', deleteUsuario);
//exportación
module.exports = router;