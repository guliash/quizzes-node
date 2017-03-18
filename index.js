const app = require('express')();
app.set('views', ['./users/views', './countries/views']);
app.set('view engine', 'pug');

const bodyParser = require('body-parser');
const config = require('./config');
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

require('mongoose').connect('mongodb://localhost:27017/quizzes');
const Country = require('./countries/model');
const User = require('./users/model');

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  },
  (username, password, cb) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }
));
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if(err) { return cb(err); }
    cb(null, user);
  });
});
app.use(passport.initialize());
app.use(passport.session());

app.use('/quizzes/countries/', require('./countries/router'));
app.use('/quizzes/users/', require('./users/router'));

app.get('/quizzes', (req, res) => {
  res.send('Hello world');
});
app.listen(3000, () => {
  console.log('Quizzes server started on port 3000.');
});
