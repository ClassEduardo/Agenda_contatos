exports.errorsMassages = (req, res, next) => {
   res.locals.errors = req.flash('errors');
   res.locals.success = req.flash('success');
   next();
}

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