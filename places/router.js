const config = require('../config');
const router = require('express').Router();
const Place = require('./model');

const upload = require('multer')({ dest: '../uploads/' });

router.get('/', (req, res) => {
  Place.find((err, countries) => {
    if(err) {
      res.status(500).send();
    } else {
      res.send(countries);
    }
  });
});

router.post('/', upload.single('image'), (req, res) => {
  const place = new Place({
    name: req.body.enigma_name,
    country: req.body.enigma_country,
    href: req.body.enigma_href,
    facts: [],
    position: {
      lat: req.body.enigma_lat,
      lng: req.body.enigma_lng
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
  place.save((err) => {
    if (err) {
      res.status(500).send();
    } else {
      res.send('Ok');
    }
  });
});

router.get('/add', (req, res) => {
  if (!req.user) {
    return res.redirect('/quizzes/users/login');
  }
  res.render('add');
});

module.exports = router;
