var session = require('./../controllers/session.js'),
    entry = require('./../controllers/entry.js')

module.exports = function(app){
  app.post('/login', function(req, res){session.login(req, res)});
  app.get('/getSessionUser', function(req, res){res.json(req.session.user)});
  app.get('/logout', function(req, res){req.session.destroy()});
  app.post('/create', function(req, res){entry.create(req, res)});
  app.get('/getEntries', function(req, res){entry.getEntries(req, res)});
  app.post('/cancel', function(req, res){entry.cancel(req, res)});
  app.post('/checkUserEntries', function(req, res){entry.checkUserEntries(req, res)});
  app.post('/checkDayEntries', function(req, res){entry.checkDayEntries(req, res)});
}
