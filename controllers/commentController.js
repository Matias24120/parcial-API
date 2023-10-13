const Comment = require('../models/commentModel');

// Controlador para crear un comentario
exports.createComment = async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).json({
            msg: 'Comentario creado',
            data: comment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        });
    }
};

// Controlador para obtener todos los comentarios
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        });
    }
};

// Controlador para obtener un comentario por su ID
exports.getCommentById = async (req, res) => {
    const commentId = req.params.id;
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ msg: 'Comentario no encontrado' });
        }
        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        });
    }
};

// Controlador para eliminar un comentario por su ID
exports.deleteComment = async (req, res) => {
    const commentId = req.params.id;
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ msg: 'Comentario no encontrado' });
        }
        await Comment.findByIdAndRemove(commentId);
        res.status(200).json({
            msg: 'Comentario eliminado',
            data: comment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        });
    }
};

// Controlador para actualizar un comentario por su ID
exports.updateComment = async (req, res) => {
    const commentId = req.params.id;
    try {
        const updatedComment = req.body;
        const comment = await Comment.findByIdAndUpdate(commentId, updatedComment, { new: true });
        if (!comment) {
            return res.status(404).json({ msg: 'Comentario no encontrado' });
        }
        res.status(200).json({
            msg: 'Comentario actualizado',
            data: comment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        });
    }
};