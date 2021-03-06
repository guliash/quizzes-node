const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate(
    'local',
    { successReturnToOrRedirect: '/quizzes/places/add', failureRedirect: '/quizzes/users/login' }
  )
);

router.get('/logout', (req, res) => {
  req.logout();
  res.send('logout');
});

module.exports = router;
