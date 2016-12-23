var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Entry = mongoose.model('Entry');

module.exports = (function(){
  return {
    login: function(req, res){
      User.findOne({name: req.body.name}, function(err, user){
        if(!user){
          var user = new User(req.body);
          user.save(function(err, user){
            if(err){
              res.json(err);
            } else {
              req.session.user = user;
              req.session.save();
              res.json(user);
            }
          })
        } else {
          req.session.user = user;
          req.session.save();
          res.json(user)
        }
      })
    },
    logout: function(req, res){
      req.session.destroy();
      res.redirect('/');
    },
  }
})()
