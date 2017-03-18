var router = require('express').Router();
var passport = require('passport');

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', passport.authenticate(
    'local',
    { successRedirect: '/quizzes', failureRedirect: '/quizzes/users/login' }
  )
);

router.get('/logout', function(req, res) {
  req.logout();
  res.send('logout');
});

module.exports = router;
