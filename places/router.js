const router = require('express').Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

router.get('/add',
  ensureLoggedIn('/quizzes/users/login'),
  (req, res) => {
    res.render('add');
  });

router.get('/edit',
  ensureLoggedIn('/quizzes/users/login'),
  (req, res) => {
  });

module.exports = router;
