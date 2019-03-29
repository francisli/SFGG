var express = require('express');
var router = express.Router();
var models = require('../models');

var uuid = require('uuid/v4');
var mime = require('mime-types');
var mkdirp = require('mkdirp');
var path = require('path');
var rimraf = require('rimraf');
var AWS = require('aws-sdk');

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

function handlePhoto(req, garden, callback) {
  if (req.files && req.files.photo && req.files.photo.name != '') {
    const key = `gardens/photo/${uuid()}/original.${mime.extension(req.files.photo.mimetype)}`;
    if (process.env.AWS_S3_BUCKET) {
      var s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_S3_BUCKET_REGION
      });
      if (garden && garden.photoUrl && garden.photoUrl != '') {
        //// delete existing photo, if any
        s3.deleteObject({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: garden.photoUrl.substring(process.env.AWS_S3_BASE_URL.length + 1)
        }, function(err, data) {
          if (err){
            console.log(err);
          }
        });
      }
      //// store in S3
      s3.putObject({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: req.files.photo.data,
        ACL: 'public-read'
      }, function(err, data) {
        if (err) {
          console.log(err);
          callback();
        } else {
          callback(`${process.env.AWS_S3_BASE_URL}/${key}`);
        }
      });
    } else {
      if (garden) {
        //// delete existing photo, if any
        if (garden.photoUrl && garden.photoUrl != '') {
          const dest = `${path.resolve(__dirname, '../public')}${garden.photoUrl}`;
          rimraf(path.dirname(dest), function(err) {
            console.log(err);
          });
        }
      }
      //// store in local file system for development, in public
      const dest = `${path.resolve(__dirname, '../public/uploads')}/${key}`;
      mkdirp.sync(path.dirname(dest));
      req.files.photo.mv(dest, function(err) {
        if (err) {
          console.log(err);
          callback();
        } else {
          callback(`/uploads/${key}`);
        }
      });
    }
  } else {
    callback();
  }
}

/* POST to create a new post */
router.post('/', function(req, res, next) {
  handlePhoto(req, null, function(photoUrl) {
    models.Garden.create({
  	  name: req.body.name,
  	  shortDescription: req.body.shortDescription,
      photoUrl: photoUrl,
      address: req.body.address,
      crossStreet: req.body.crossStreet,
      city: req.body.city,
      zipCode: req.body.zipCode,
      neighborhood: req.body.neighborhood,
      managedBy: req.body.managedBy,
      openHours: req.body.openHours,
      contactEmail: req.body.contactEmail,
      contactPhone: req.body.contactPhone,
      contactLink: req.body.contactLink,
    }).then(function(garden) {
  	  res.redirect(`/gardens/${garden.id}`)
    });
  });
});

/* GET a specific garden */
router.get('/:id/edit', function(req, res, next) {
  models.Garden.findById(req.params.id).then(function(garden) {
    res.render('gardens/edit', {
      title: 'Edit Garden',
      garden: garden
    });
  });
});

/* GET a specific garden */
router.patch('/:id', function(req, res, next) {
  models.Garden.findById(req.params.id).then(function(garden) {
    handlePhoto(req, garden, function(photoUrl) {
      garden.update({
        name:req.body.name,
        shortDescription:req.body.shortDescription,
        photoUrl: photoUrl,
        address: req.body.address,
        crossStreet: req.body.crossStreet,
        city: req.body.city,
        zipCode: req.body.zipCode,
        neighborhood: req.body.neighborhood,
        managedBy: req.body.managedBy,
        openHours: req.body.openHours,
        contactEmail: req.body.contactEmail,
        contactPhone: req.body.contactPhone,
        contactLink: req.body.contactLink,
      }).then(function(){
          res.redirect(`/gardens/${garden.id}`);
      });
    });
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
