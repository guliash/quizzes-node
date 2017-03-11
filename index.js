var app = require('express')();

var Country = require('./countries/model');

app.get('/quizzes/countries', function(req, res) {
  Country.find(function(err, countries) {
    if(err) {
      res.status(500).send();
    } else {
      res.send(countries);
    }
  });
});

app.listen(3000, function() {
  console.log('Quizzes server started on port 3000.')
});
