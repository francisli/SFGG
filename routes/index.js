var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Garden.all().then(function(gardens) {
    res.render('index', {
      title: 'SF Green Grounds',
      gardens: gardens
    });
  });

});

module.exports = router;
