exports.errorsMassages = (req, res, next) => {
   res.locals.errors = req.flash('errors');
   res.locals.success = req.flash('success');
   res.locals.user = req.session.user;
   next();
}

exports.loginRequired = (req, res, next) => {
   if(!req.session.user) {
      req.flash('errors', 'Você precisa se logar para entrar nos contatos.');
      req.session.save( () => res.redirect('/') );
      return;
   };

   next();
};

exports.csrfAllSendToken = (req, res, next) => {
   res.locals.csrfToken = req.csrfToken();
   next();
}

exports.checkCsrfToken = (err, req, res, next) => {
   if(err) {
      console.log(err);
      return res.render('err404');
   }
   next();
}