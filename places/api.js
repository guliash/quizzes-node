const config = require('../config');
const express = require('express');
const upload = require('multer')({ dest: '../uploads/' });
const router = express.Router();

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

router.post('/', upload.single('image'), (req, res) => {
  if (!req.user) {
    return res.status(401).send();
  }
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
});

module.exports = router;
