const express = require('express');
const dataBase = require('./dataBase');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const commentController = require('./controllers/commentController');
const productController = require('./controllers/productController');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(express.json());

// Middleware de validación de token
function validarToken(req, res, next) {
    const token = req.headers.authorization;
    console.log(token)

    if (!token) {
        return res.status(401).json({ error: 'No se ha enviado el token' })
    }

    // Si hay token, lo validamos
    jwt.verify(token, process.env.CLAVE, (error, decoded) => {
        if (error) {
            return res.status(401).json({ error: 'Token no válido' })
        }

        // Si es válido, lo guardamos en el request
        req.user = decoded;
        next();
    })


    next();
}



// Me conecto a la BD
dataBase.on('error', () => {
    console.error('Error de conexion con MongoDB')
});

dataBase.once('open', () => {
    console.log('Conexión con MongoDB 👌');
})



// Rutas
app.get('/', (req, res) => {
    res.send('<h1>API REST</h1>');
})



// user
app.get('/api/user', userController.obtenerTodos);

app.get('/api/user/:id', userController.obtenerPorId);

app.post('/api/auth', userController.auth);

app.post('/api/user', userController.crear);

app.put('/api/user/:id', userController.actualizar); 

app.delete('/api/user/:id', userController.eliminar);



// post
app.get('/api/post', postController.obtenerTodos);

app.post('/api/post', validarToken, postController.crear);

app.put('/api/post/:id', postController.actualizar); 

app.delete('/api/post/:id', postController.eliminar); 

app.get('/api/post/:postId', postController.obtenerPostPorId);



// comentario

app.post('/api/comment', commentController.createComment);

app.get('/api/comment', commentController.getAllComments);

app.get('/api/comment/:id', commentController.getCommentById);

app.delete('/api/comment/:id', commentController.deleteComment);

app.put('/api/comment/:id', commentController.updateComment);



// product

app.post('/api/product', productController.createProduct);

app.get('/api/product', productController.getAllProducts);

app.get('/api/product/:id', productController.getProductById);

app.delete('/api/product/:id', productController.deleteProduct);

app.put('/api/product/:id', productController.updateProduct);



// puerto
app.listen(port, () => {
    console.log('Servidor en el puerto ', port);
})