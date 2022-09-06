const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
   nome: { type: String, required: true},
   sobrenome: { type: String, required: false, default: ''},
   email: { type: String, required: false, default: ''},
   celular: { type: Number, required: false, default: ''},
   dataCriação: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact (body) {
   this.body = body;
   this.errors = [];
   this.contact = null;
};

Contact.prototype.register = async function() {
   this.valida();

   if(this.errors.length > 0) return;

   this.contact = await ContactModel.create(this.body);
};


Contact.prototype.valida = function() {
   this.cleanUp();

   if(this.body.nome && !validator.isEmail(this.body.email)) { 
      this.errors.push('E-mail inválido');
   };

   if(!this.body.nome) this.errors.push('Campo nome é obrigatório.');

   if(!this.body.email && !this.body.celular) {
      this.errors.push('Email ou celular precisa ser enviado')
   }
};

Contact.prototype.cleanUp = function() {
   for ( const key in this.body) {
      if( typeof this.body[key] !== 'string') {
         this.body[key] = '';
      };
   }

   this.body = {
      nome:  this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      celular: this.body.celular,
   };
};

Contact.prototype.editContactRoutForm = async function(id) {
   if( typeof id !== 'string') return;

   this.valida();

   if(this.errors.length > 0) return;

   this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new:true })

}

// Static Methods
   Contact.searchByIdContact = async function(id) {
      const idContact = await ContactModel.findById(id);
      return idContact;
   }


   Contact.searchContacts = async function() {
      const idContacts = await ContactModel.find().sort({ dataCriação: -1 });
      return idContacts;
   }
   

module.exports = Contact;