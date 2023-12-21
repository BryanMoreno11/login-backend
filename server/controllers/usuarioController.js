const pool = require("../database");

//devolver un usuario por id
async function getUsuario(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM usuario where id_usuario=$1'
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        res.status(200);
        if (result.rowCount > 0) {
            res.json(result.rows);
        } else {
            res.status(500).json({ message: 'No existe el usuario' });
        }

    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}
//devolver todos los usuarios
async function getUsuarios(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM usuario');
        client.release();
        res.status(200);
        if (result.rowCount > 0) {
            res.json(result.rows);
        } else {
            res.status(500).json({ message: 'No hay usuarios' });
        }

    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}
//función para insertar un usuario
async function createUsuario(req, res) {
    const { nombre, apellido, email, pass, avatar } = req.body;
    const query = 'INSERT INTO usuario (nombre,apellido,email,pass,avatar) VALUES ($1,$2,$3,$4,$5)';
    const values = [nombre, apellido, email, pass, avatar];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se guardó el usuario' });
        } else {
            res.status(400).json({ message: 'No se guardó el usuario' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}
//Modificar un usuario
async function updateUsuario(req, res) {
    const { id } = req.params;
    const { nombre, apellido, email, pass, avatar } = req.body;
    const query = 'UPDATE usuario SET nombre=$2, apellido=$3,email=$4,pass=$5,avatar=$6  WHERE id_usuario=$1';
    const values = [id, nombre, apellido, email, pass, avatar];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se actualizó el usuario' });
        } else {
            res.status(400).json({ message: 'No se actualizó el usuario' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}
//eliminar usuario por un id 
async function deleteUsuario(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM usuario where id_usuario=$1'
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'usuario eliminado' });
        } else {
            res.status(500).json({ message: 'No existe el usuario' });
        }


    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

//verificar usuario
async function verificarUsuario(req, res) {
    const { email, pass } = req.body;
    const query = 'SELECT * FROM usuario  WHERE email=$1 AND pass=$2';
    const values = [email, pass];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Usuario registrado' });
        } else {
            res.status(400).json({ message: 'El usuario no esta registrado' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

module.exports = { getUsuarios, getUsuario, updateUsuario, deleteUsuario, createUsuario, verificarUsuario };