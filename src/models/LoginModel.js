// Module
   const mongoose = require('mongoose');
   const validator = require('validator');
   const bcryptjs = require('bcryptjs');

// Schema Mongoose
   const LoginSchema = new mongoose.Schema({
      email: { type: String, required: true },
      password: { type: String, required: true }
   });

// Model
   const LoginModel = mongoose.model('Login', LoginSchema);

// Class do Login
   class Login {
      constructor(body) {
         this.body = body;
         this.errors = [];
         this.user = null;
      };

      async login() {
         this.valida();
         if(this.errors.length > 0) return;

         await this.checkForLogin();
      }

      async checkForLogin() {
         this.user = await LoginModel.findOne({ email: this.body.email });

         if(!this.user) {
            this.errors.push('Usuário não existe ou e-mail incorreto.');
            return;
         }

         if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha incorreta.');
            this.user = null;
            return;
         }
      }


      async register() {
         this.valida();
         if(this.errors.length > 0) return;
         
         await this.checkExistUser();
         
         if(this.errors.length > 0) return;

         const salt = bcryptjs.genSaltSync();
         this.body.password = bcryptjs.hashSync(this.body.password, salt);
         
         
         this.user = await LoginModel.create(this.body);
         
      }

      async checkExistUser() {
         this.user = await LoginModel.findOne({ email: this.body.email });
         if(this.user) this.errors.push('Usuário já existe.');
      }

      valida() {
         this.cleanUp(); 
         // Validação
         // O e-mail precisa ser válido
            if(!validator.isEmail(this.body.email)) this.errors.push('E-main invalido.');

         // A senha precisa ter entre 3 e 50 cracteres
            if(this.body.password.length < 3 || this.body.password.length > 50) {
               this.errors.push('Senha precisa ter entre 3 e 50 caracteres.');
            }; 
      };

      cleanUp() {
         for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
               this.body[key] = '';
            }
         }

         this.body = {
            email: this.body.email,
            password: this.body.password
         }
      }
   };

// Exports
   module.exports = Login;