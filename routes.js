// Modules 
   const express = require('express');
   const route = express.Router();

// Controllers 
   const homeController = require('./src/controllers/homeController');
   const loginController = require('./src/controllers/loginController');
   const contatosController = require('./src/controllers/contatosController');

   const { loginRequired } = require('./src/middlewares/middleware')

// Routes home
   route.get('/', homeController.index);

// Routes login
   route.get('/login/index', loginController.index);
   route.post('/login/login', loginController.login);
   route.post('/login/register', loginController.register);
   route.get('/login/logout', loginController.logout);

// Routes contact
   route.get('/contato/createContact', loginRequired, contatosController.createContact);
   route.post('/contato/sendContactBD', loginRequired, contatosController.sendContactBD);

// Export router
   module.exports = route;