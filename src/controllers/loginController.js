const Login = require('../models/LoginModel')

exports.index = (req, res) => {
   res.render('login');
};

exports.register = async (req, res) => {
   try {
      const login = new Login(req.body);
      await login.register();
   

      // Case error
      if(login.errors.length > 0) {
         req.flash('errors', login.errors);
         req.session.save( () => {
            return res.redirect('back');
         });
         return;
      };

      // Case success
      req.flash('success', 'Seu usuário foi criado com sucesso.');
      req.session.save( () => {
         return res.redirect('back');
      });

   } catch(e) {
      console.log(e);
      return res.render('err404')
   }
};


