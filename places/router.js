const router = require('express').Router();

router.get('/add', (req, res) => {
  if (!req.user) {
    return res.status(401).send();
  }
  res.render('add');
});

module.exports = router;
