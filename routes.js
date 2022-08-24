// Modules 
   const express = require('express');
   const route = express.Router();

// Controllers 
   const homeControlle = require('./src/controllers/homeController');

// Routes
   route.get('/', homeControlle.index);

   route.post('/', homeControlle.indexPost);

// Export router
   module.exports = route;