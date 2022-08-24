exports.csrfAllSendToken = (req, res, next) => {
   res.locals.csrfToken = req.csrfToken();
   next();
}

exports.checkCsrfToken = (err, req, res, next) => {
   if(err && err === 'EBADCSRFTOKEN') {
      console.log(err);
      return res.render('404');
   }
}