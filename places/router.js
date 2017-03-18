const router = require('express').Router();

router.get('/', (req, res) => {
  Country.find((err, countries) => {
    if(err) {
      res.status(500).send();
    } else {
      res.send(countries);
    }
  });
});

router.post('/', (req, res) => {

});

router.get('/add', (req, res) => {
  if (!req.user) {
    return res.redirect('/quizzes/users/login');
  }
  res.render('add');
});

module.exports = router;
