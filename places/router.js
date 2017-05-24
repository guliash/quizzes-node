const router = require('express').Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const Place = require('./model').Place;

router.get('/add',
  ensureLoggedIn('/quizzes/users/login'),
  (req, res) => {
    res.render('add');
  }
);

router.get('/edit/:id',
  ensureLoggedIn('/quizzes/users/login'),
  (req, res) => {
    Place.findById(req.params.id)
      .then(place => {
        if (place) {
          res.render('edit', { place: place });
        } else {
          res.status(500).send('Could not find place with id = ' + req.params.id);
        }
      }, error => {
        res.status(500).send(error);
      });
  }
);

module.exports = router;
