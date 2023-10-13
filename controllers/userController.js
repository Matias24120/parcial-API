const userModel = require('../models/userModel');

// Encriptar contraseña. 
const bcrypt = require('bcrypt');
const salt = 10;

const jwt = require('jsonwebtoken');

const clave = 'appKey'


// Obtener todos los usuarios
exports.obtenerTodos = async (req, res) => {
    try {
        const usuarios = await userModel.find();
        res.status(200).json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

// Autenticación
exports.auth = async (req, res) => {

    const { email, password } = req.body

    const usuario = await userModel.findOne({ email })

    if (!usuario) {
        res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    const match = await bcrypt.compare(password, usuario.password)

    if (!match) {
        res.status(401).json({ msg: 'Contraseña incorrecta' });
    }
    
    const token = jwt.sign({
      email: usuario.email,
    }, 
    // Aca recibe la clave privada en un archivo .env.
    clave, {
        // Tiempo de expiración del token
        expiresIn: '1h'
    })

    res.status(200).json({ msg: 'Usuario autenticado', token });

}

// Creo el controlador del usuario
exports.crear = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            res.status(400).json({ msg: 'Faltan campos' });
        }

        const passHash = await bcrypt.hash(password, salt);

        const userNew = new userModel({
            name: name,
            email,
            password: passHash
        });

        await userNew.save();

        res.status(201).json({
            msg: 'Usuario Guardado',
            id: userNew._id
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error en el servidor' })
    }
}

// Actualizar usuario
exports.actualizar = async (req, res) => {
    try {
        // Obtengo el id del usuario
        const { id } = req.params
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            res.status(400).json({ msg: 'Faltan campos' });
        }

        const user = await userModel.findById(id);

        if(!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Creo el hash
        const passHash = await bcrypt.hash(password, salt);

        const usuario = {
            name,
            email,
            password: passHash
        }

        await userModel.updateOne({ _id: id }, { $set: usuario });

        res.status(201).json({
            msg: 'Usuario actualizado',
            id: user._id
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

// Eliminar
exports.eliminar = async (req, res) => {
    try {
        // Obtengo el id del usuario
        const { id } = req.params;

        const user = await userModel.findById(id);

        if(!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Elimino el usuario
        await userModel.deleteOne({ _id: id });

        res.status(200).json({
            msg: 'Usuario eliminado',
            id: user._id
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error en el servidor' })
    }
}

// Obtener un usuario por su ID
exports.obtenerPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await userModel.findById(id);

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};




