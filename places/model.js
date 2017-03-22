const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
  name: String,
  country: String,
  href: String,
  facts: [String],
  position: { lat: Number, lng: Number },
  image: {
    href: String,
    attribution: {
      source: String,
      author: {
        name: String,
        href: String
      },
      license: {
        name: String,
        href: String
      }
    }
  }
}, { collection: 'places' });

module.exports = mongoose.model('Place', placeSchema);
