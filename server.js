var mongoose = require('mongoose'),
    express  = require('express'),
    session  = require('express-session'),
    bp       = require('body-parser'),
    path     = require('path'),
    root     = __dirname,
    port     = process.env.PORT || 8000, //if exists, set to PORT environment variable, otherwise 8000
    app      = express();

app.use(session({
  secret: 'stop lookin here',
  resave: false,
  saveUninitialized: true,
}))

app.use(bp.json());
app.use(express.static(path.join(root, 'client')));
app.use(express.static(path.join(root, 'bower_components')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(port, function(){
  console.log(`Server listening on port ${port}`);
})
