// Modules express
   const express = require('express');
   const app = express();
   const path = require('path');

// Mongoose - dotenv
   require('dotenv').config();
   const mongoose = require('mongoose');
   const MongoStore = require('connect-mongo');
   // Config
      mongoose.connect(process.env.CONNECTION_STRING, {
         useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
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
   // Config session
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
      app.use(sessionConfig);

// Flash msgs 
   const flash = require('connect-flash');
   app.use(flash());


// Views config
   app.set('views', path.resolve(__dirname, 'src', 'views'));
   app.set('view engine', 'ejs');
 

// CRSF (csurf)
   const csrf = require('csurf');
   app.use(csrf());


// Middlewares
   const { csrfAllSendToken, checkCsrfToken } = require('./src/middlewares/middleware')
   // use middlewares
      app.use(csrfAllSendToken);
      app.use(checkCsrfToken);


// Routes
   const routes = require('./routes');
   app.use(routes);


// Start server
   const PORT = 3000;
   app.on('pronto', () => {
      app.listen(PORT, () => {
         console.log(`Acessar http://localhost:${PORT}`);
         console.log(`Servidor executando na porta ${PORT}.`)
      });
   });