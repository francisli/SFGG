var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET index/list of gardens. */
router.get('/', function(req, res, next) {
  models.Garden.all().then(function(gardens) {
    res.render('gardens/index', {
      title: 'Gardens',
      gardens: gardens
    });
  });
});

/* GET a form to create a new post */
router.get('/new', function(req, res, next) {
  res.render('gardens/new', { title: 'New Garden' });
});

/* POST to create a new post */
router.post('/', function(req, res, next) {
  models.Garden.create({
	  name: req.body.name,
	  shortDescription: req.body.shortDescription
  }).then(function(garden) {
	  res.redirect(`/gardens/${garden.id}`)
  });
});

/* GET a specific garden */
router.get('/:id', function(req, res, next) {
  models.Garden.findById(req.params.id).then(function(garden) {
    res.render('gardens/show', {
      title: 'Show Garden',
      garden: garden
    });
  });
});

module.exports = router;
