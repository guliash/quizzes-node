const config = require('../config');
const express = require('express');
const upload = require('multer')({ dest: '../uploads/' });
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const Place = require('./model').Place;

router.get('/', (req, res) => {
  Place.find().then(places => {
    res.send(places);
  }, error => {
    res.status(500).send(error);
  });
});

router.get('/:id', (req, res) => {
  Place.findById(req.params.id)
    .then(place => {
      res.send(place);
    }, error => {
      res.status(500).send(error);
    });
});

router.post('/add',
  ensureLoggedIn('/quizzes/users/login'),
  upload.single('image'),
  (req, res) => {
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
        res.send(place);
      }, error => {
        res.status(500).send(error);
      }
    );
  }
);

router.post('/edit/:id',
  ensureLoggedIn('/quizzes/users/login'),
  upload.single('image'),
  (req, res) => {
    Place.findById(req.params.id)
      .then(place => {
        if (!place) {
          return res.status(500).send('Could not find place with id ' + req.params.id);
        }
        place.name = req.body.place_name;
        place.country = req.body.place_country;
        place.href = req.body.place_href;
        place.facts = [];
        place.position.lat = req.body.place_lat;
        place.position.lng = req.body.place_lng;
        place.image.attribution.source = req.body.image_source;
        place.image.attribution.author.name = req.body.image_author_name;
        place.image.attribution.author.href = req.body.image_author_href;
        place.image.attribution.license.name = req.body.image_license_name;
        place.image.attribution.license.href = req.body.image_license_href;
        if (req.file) {
          place.image.href = config.HOST + '/quizzes/uploads/' + req.file.filename;
        }
        return place.save();
      })
      .then(place => {
        res.send(place);
      }, error => {
        res.status(500).send(error);
      });
  }
);

module.exports = router;
