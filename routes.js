// Modules 
   const express = require('express');
   const route = express.Router();

// Controllers 
   const homeController = require('./src/controllers/homeController');
   const loginController = require('./src/controllers/loginController');

// Routes home
   route.get('/', homeController.index);

// Routes login
   route.get('/login/index', loginController.index)

// Export router
   module.exports = route;