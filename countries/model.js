var mongoose = require('mongoose');

var countrySchema = mongoose.Schema({
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
}, { collection: 'countries' });

var Country = mongoose.model('Country', countrySchema);

module.exports = Country;
