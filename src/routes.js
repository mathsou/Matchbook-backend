const express = require ('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const connection = require('./database/connection');
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
const homeController = require('./controllers/homeController');
const bookController = require('./controllers/bookController');
const profileController = require('./controllers/profileController');
const photoController = require('./controllers/photoController');
const haveBooksController = require('./controllers/haveBooksController');


const routes = express.Router();

const authMiddleware = require('./middlewares/auth');


routes.post('/register', userController.create);
routes.post('/login', sessionController.create);

routes.use(authMiddleware);

routes.get('/haveBooks', haveBooksController.index);

routes.post('/photos', multer(multerConfig).single('file'), photoController.create);
routes.get('/photos', photoController.index);
routes.delete('/photos', photoController.remove);

routes.get('/home', homeController.index);
routes.post('/home', homeController.create);

routes.get('/user/:id', userController.index);
routes.put('/user', userController.modify);

routes.get('/profile', profileController.index);
routes.post('/profile', profileController.create);
routes.put('/profile', profileController.modify);

routes.get('/book', bookController.index);
routes.post('/book', bookController.create);

module.exports = routes;