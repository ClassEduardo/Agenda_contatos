const Contact = require('../models/ContactsModel')

exports.index = async (req, res) => {
   console.log('flag HomePage');
   const contacts = await Contact.searchContacts();
   res.render('homePage', { contacts });
   return
}
