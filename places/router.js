const config = require('../config');
const router = require('express').Router();
const Place = require('./model').Place;
const Country = require('./model').Country;

const upload = require('multer')({ dest: '../uploads/' });

router.get('/', (req, res) => {
  Place.find().then(countries => {
    res.send(countries);
  }, error => {
    res.status(500).send();
  });
});

router.post('/', upload.single('image'), (req, res) => {
  const place = new Place({
    name: req.body.place_name,
    country: req.body.place_country,
    href: req.body.place_href,
    facts: [],
    position: {
      lat: req.body.place_lat,
      lng: req.body.place_lng
    },
    image: {
      href: config.HOST + '/quizzes/uploads/' + req.file.filename,
      attribution: {
        source: req.body.image_source,
        author: {
          name: req.body.image_author_name,
          href: req.body.image_author_href
        },
        license: {
          name: req.body.image_license_name,
          href: req.body.image_license_href
        }
      }
    }
  });
  place.save().then(place => {
      res.send('Ok');
    }, error => {
      res.status(500).send(error);
    }
  );
});

router.get('/add', (req, res) => {
  if (!req.user) {
    return res.redirect('/quizzes/users/login');
  }
  res.render('add');
});

module.exports = router;
