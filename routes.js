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

// Routes create contact
   route.get('/contato/createContact', loginRequired, contatosController.createContact);
   route.post('/contato/sendContactBD', loginRequired, contatosController.sendContactBD);

//  Route edit contact
   route.get('/contato/editContact/:id', loginRequired, contatosController.editContact);
   route.post('/contato/editContactRoutForm/:id', loginRequired, contatosController.editContactRoutForm);
   route.get('/contato/deleteContat/:id', loginRequired, contatosController.deleteContat);

// Export router
   module.exports = route;