const Product = require('../models/productModel');

// Controlador para crear un producto
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({
            msg: 'Producto creado',
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        });
    }
};

// Controlador para obtener todos los productos
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        });
    }
};

// Controlador para obtener un producto por su ID
exports.getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        });
    }
};

// Controlador para eliminar un producto por su ID
exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        await Product.findByIdAndRemove(productId);
        res.status(200).json({
            msg: 'Producto eliminado',
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        });
    }
};

// Controlador para actualizar un producto por su ID
exports.updateProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const updatedProduct = req.body;
        const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        res.status(200).json({
            msg: 'Producto actualizado',
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        });
    }
};