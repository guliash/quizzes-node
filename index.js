var app = require('express')();
app.set('views', ['./users/views', './countries/views']);
app.set('view engine', 'pug');

var bodyParser = require('body-parser');
var config = require('./config');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('express-session')({
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  },
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/quizzes');
var Country = require('./countries/model');
var User = require('./users/model');

var passport = require('passport');
var Strategy = require('passport-local').Strategy;
passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  },
  function(username, password, cb) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }
));
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    if(err) { return cb(err); }
    cb(null, user);
  });
});
app.use(passport.initialize());
app.use(passport.session());

app.use('/quizzes/countries/', require('./countries/router'));
app.use('/quizzes/users/', require('./users/router'));

app.get('/quizzes', function(req, res) {
  res.send('Hello world');
});
app.listen(3000, function() {
  console.log('Quizzes server started on port 3000.')
});
