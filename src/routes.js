const express = require('express');


const bookController = require('./controllers/bookController')

const routes = express.Router();


routes.get('/books', bookController.index);


module.exports = routes;