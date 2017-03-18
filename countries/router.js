var router = require('express').Router();

router.get('/', function(req, res) {
  Country.find(function(err, countries) {
    if(err) {
      res.status(500).send();
    } else {
      res.send(countries);
    }
  });
});

router.post('/', function(req, res) {

});

router.get('/add', function(req, res) {
  console.log(req.user);
  if (!req.user) {
    return res.redirect('/quizzes/users/login');
  }
  res.render('add');
});

module.exports = router;
