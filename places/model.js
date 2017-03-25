const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
  name: String,
  region: String,
  subregion: String
}, { collection: 'countries' });

const Country = mongoose.model('Country', countrySchema);

const placeSchema = mongoose.Schema({
  name: String,
  country: {
    type: String,
    validate: value => new Promise((resolve, reject) => {
        Country.find().then(countries => {
            resolve(
              countries.filter(country => country.name == value).length != 0
            );
          }, error => {
            reject(error);
          }
        );
      }
    )
  },
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

const Place = mongoose.model('Place', placeSchema);

const models = {
  Place: Place,
  Country: Country
};

module.exports = models;
