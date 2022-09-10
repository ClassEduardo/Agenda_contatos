// Modules 
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
   
   // Mongoose conect
   const mongoose = require('mongoose');
   mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
         useUnifiedTopology: true}).then(() => {app.emit('pronto');})
      .catch(e => console.log(e));

// Connect session and BD
   const session = require('express-session');
   const MongoStore = require('connect-mongo');
   const sessionOptions = session({
      secret: 'akasdfj0út23453456+54qt23qv  qwf qwer qwer qewr asdasdasda a6()',
      store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING }),
      resave: false,
      saveUninitialized: false,
      cookie: {
         maxAge: 1000 * 60 * 60 * 24 * 7,
         httpOnly: true
      }
      });
      app.use(sessionOptions);

// Configs
   // View content post
   app.use(express.urlencoded({ extended: true }));
   // Json files
   app.use(express.json());
   // Static pages
   app.use(express.static(path.resolve(__dirname, 'public')));

// Flash massages
   const flash = require('connect-flash');
   app.use(flash());




// helmet SSL
   // const helmet = require('helmet'); // helmet começou a causar problemas no localhost por conta da falta de SSL
   // app.use(helmet()); // helmet começou a causar problemas no localhost por conta da falta de SSL


// CSURF Securt
   const csrf = require('csurf');
   app.use(csrf());


// Middlewares 
   const { csrfAllSendToken, checkCsrfToken, errorsMassages } = require('./src/middlewares/middleware');
   // Use middlewares
      app.use(errorsMassages);
      app.use(csrfAllSendToken);
      app.use(checkCsrfToken);


// Views pages
   app.set('views', path.resolve(__dirname, 'src', 'views'));
   app.set('view engine', 'ejs');


// Use routes
   const routes = require('./routes');
   app.use(routes);

// Start server
   app.on('pronto', () => {
      app.listen(3000, () => {
         console.log('Acessar http://localhost:3000');
         console.log('Servidor executando na porta 3000');
      });
   });