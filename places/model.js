const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
  name: String,
  country: String,
  href: String,
  facts: [String],
  position: { lat: Number, lng: Number },
  image: {
    url: String,
    attribution: {
      resource: {
        href: String,
        link: String
      },
      author: {
        href: String,
        link: String
      },
      license: {
        href: String,
        link: String
      }
    }
  }
}, { collection: 'places' });

module.exports = mongoose.model('Place', placeSchema);
