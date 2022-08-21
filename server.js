// Modules express
   const express = require('express');
   const app = express();
   const path = require('paths');

// Mongoose - dotenv
   require('dotenv').config();
   const mongoose = require('mongoose');
   const MongoStore = require('connect-mongo');
   // Config
      mongoose.connect(process.env.CONNECTION_STRING, {
         useNewUrl: true, useUnifiedTopology: true}).then(() => {
            console.log('Flag db conected');
            app.emit('pronto')
         }).catch((e) => {console.log(e)});

// Start server
   const PORT = 3000;
   app.on('pronto', () => {
      app.listen(PORT, () => {
         console.log(`Acessar http://localhost:${PORT}`);
         console.log(`Servidor executando na porta ${PORT}.`)
      });
   });