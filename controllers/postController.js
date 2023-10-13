const postModel = require('../models/postModel');
const userModel = require('../models/userModel');

exports.crear = async(req, res) => {
    try {
        const post = new postModel( req.body );
        await post.save();

        res.status(201).json({
            msg: 'Post Creado',
            data: post
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }
}

exports.obtenerPostPorId = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Obtener todos los posts
exports.obtenerTodos = async (req, res) => {
    try {
        const posts = await postModel.find();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

// Actualizar un post
exports.actualizar = async (req, res) => {
    try {
        const { title, body } = req.body;
        const { id } = req.params;
        
        const post = await postModel.findById(id);
        
        if (!post) {
            return res.status(404).json({ msg: 'Post no encontrado' });
        }
        
        post.title = title;
        post.body = body;

        await post.save();

        res.status(201).json({
            msg: 'Post actualizado',
            id: post._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

// Eliminar un post
exports.eliminar = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({ msg: 'Post no encontrado' });
        }

        await postModel.deleteOne({ _id: id });

        res.status(200).json({
            msg: 'Post eliminado',
            id: post._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}