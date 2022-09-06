const Login = require('../models/LoginModel')

exports.index = (req, res) => {
   if(req.session.user) return res.render('login-logado')
   res.render('login');
};

exports.register = async (req, res) => {
   try {
      const login = new Login(req.body);
      await login.register();

      // Case error
      if(login.errors.length > 0) {
         req.flash('errors', login.errors);
         req.session.save(() => {
            return res.redirect('back');
         });
         return;
      };

      // Case success
      req.flash('success', 'Seu usuário foi criado com sucesso.');
      req.session.save(() => {
         return res.redirect('back');
      });

   } catch(e) {
      console.log(e);
      return res.render('err404')
   }
};


exports.login = async (req, res) => {
   try{
      const login = new Login(req.body);
      await login.login();

      if(login.errors.length > 0) {
         req.flash('errors', login.errors);
         req.session.save(() => {
            return res.redirect('back');
         });
         return;
      };

      req.flash('success', 'Você Logou com sucesso.');
      req.session.user = login.user;
      req.session.save(() => {
         return res.redirect('back');
      });


   } catch(e) {
      console.log(e);
      res.render('err404');
   }
};

exports.logout = (req, res) => {
   req.session.destroy();
   res.redirect('/')
};