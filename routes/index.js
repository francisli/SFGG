var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/new-page', function(req, res, next) {
  res.render('new-page', { title: 'New page!' });
});

module.exports = router;
