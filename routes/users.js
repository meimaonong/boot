var express = require('express');
var router = express.Router();

var userModel = require('../lib/mongo.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/index');
});

router.get('/register', function(req, res, next) {
  res.render('users/register');
});

router.get('/success', function(req, res, next) {
  // res.console.log("Hello from your server :)");
  // res.render('index', { title: 'Express' });

  res.render('users/success');
});

router.post('/add', function(req, res, next) {
  var newUser = new userModel({
    email: req.body.email,
    password: req.body.password
    
  })
  newUser.save(function(err, data){
    if(err){ return console.log(err) }
    res.redirect('/users/success');
  })
});

module.exports = router;
