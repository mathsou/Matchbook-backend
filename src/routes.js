const express = require ('express');
const connection = require('./database/connection');
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');



const routes = express.Router();

const authMiddleware = require('./middlewares/auth');


routes.post('/register', userController.create);
routes.post('/login', sessionController.create);


routes.use(authMiddleware);

routes.get('/user', userController.index);
routes.put('/user', userController.modify);

module.exports = routes;