var express = require('express');
var router = express.Router();
var models = require('../models');
var bcrypt = require ('bcrypt');

/* GET the registration form */
router.get('/', function (req, res, next) {
  res.render('registrations/new',{
    title: 'Register'
  });

})

/* POST the registration form data to create the User */

router.post('/', function (req, res, next){
  bcrypt.hash(req.body.password, 10).then (function(hash) {
    models.User.create({
      login: req.body.login,
      hashed_password: hash
    }).then(function(user) {
      res.redirect('/');
    });
  });
});



module.exports = router;
