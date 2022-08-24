exports.index = (req, res) => {
   console.log('flag HomePage');
   res.render('index');
   return
}

exports.indexPost = (req, res) => {
   res.send(req.body);
}