exports.createContact = (req, res) => {
   res.render('createContact')
}

exports.sendContactBD = (req, res, next) => {
   res.send('Olá')
}