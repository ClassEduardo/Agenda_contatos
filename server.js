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

// Configs app
   // Request config 
      app.use(express.urlencoded({ extended:true }));

   // File Static config
      app.use(express.static(path.resolve(__dirname, 'public')));

   // JSON
      app.use(express.json());


// Session 
   const session = require('express-session');
   // Config Session
      const sessionConfig = session({
         secret: 'topsecretsessionIDsecret',
         resave: false,
         saveUninitialized: false,
         store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING }),
         cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true
         }
      })

// Start server
   const PORT = 3000;
   app.on('pronto', () => {
      app.listen(PORT, () => {
         console.log(`Acessar http://localhost:${PORT}`);
         console.log(`Servidor executando na porta ${PORT}.`)
      });
   });