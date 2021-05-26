const express = require ('express');
const connection = require('./database/connection');
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
const bookController = require('./controllers/bookController');
const profileController = require('./controllers/profileController');


const routes = express.Router();

const authMiddleware = require('./middlewares/auth');


routes.post('/register', userController.create);
routes.post('/login', sessionController.create);


routes.use(authMiddleware);

routes.get('/book', bookController.index);
routes.get('/user', userController.index);
routes.put('/user', userController.modify);

routes.get('/profile', profileController.index);
routes.post('/profile', profileController.create);
routes.put('/profile', profileController.modify);

module.exports = routes;