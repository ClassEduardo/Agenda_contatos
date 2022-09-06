const Contact = require('../models/ContactsModel')

exports.createContact = (req, res) => {
   res.render('createContact', {
      idContact: {}
   })
}

exports.sendContactBD = async (req, res) => {
   try {
      const contact = new Contact(req.body);
      await contact.register(); 
   
      if(contact.errors.length > 0) {
         req.flash('errors' , contact.errors);
         req.session.save(() => {
            return res.redirect('back');
         })
         return;
      }
   
      req.flash('success' , 'Contato criado com sucesso.');
      req.session.save(() => {
         return res.redirect(`/contato/editContact/${contact.contact._id}`);
      });
   
   } catch (e) {
      console.log(e, 'sendContactBD');
      return res.render('err404')
   }
};

exports.editContact = async function(req, res) {
   if(!req.params.id) return res.render('err404');

   const idContact = await Contact.searchByIdContact(req.params.id)
   if(!idContact) {
      return res.render('err404');
   }

   res.render('createContact', { idContact });
}


exports.editContactRoutForm = async function(req, res, next) {
    try {
      if(!req.params.id) return res.render('err404');

      const contact = new Contact(req.body);
      await contact.editContactRoutForm(req.params.id);
   
   
      if(contact.errors.length > 0) {
         req.flash('errors' , contact.errors);
         req.session.save(() => {
            return res.redirect('back');
         })
         return;
      }
   
      req.flash('success' , 'Contato editado com sucesso.');
      req.session.save(() => {
         return res.redirect(`/contato/editContact/${contact.contact._id}`);
      });
      return ;
   
    } catch (e) {
      console.log(e, 'editContactRoutForm');
      return res.render('err404')

    }

};