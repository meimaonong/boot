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

router.get('/edit', function(req, res, next) {
  // res.console.log("Hello from your server :)");
  // res.render('index', { title: 'Express' });
  var id = req.query.id;
  userModel.findOne({_id: id}, function (err, data) {
    res.console.log(data);
    res.render('users/edit', {
      user: data
    })
  })

  //res.render('users/edit');
});

router.post('/delete', function (req, res) {
  var id = req.body.id;
  //res.console.log(req);
  userModel.remove({_id: id}, function (err, data) {
    if(err){ return console.log(err); }
    res.json({code: 200, msg: '删除成功'});
  })
})

router.post('/add', function(req, res, next) {
  var newUser = new userModel({
    email: req.body.email,
    password: req.body.password
    
  })
  newUser.save(function(err, data){
    if(err){ return console.log(err) }
    //res.redirect('/users/success');
    res.send({code: 0, data: null, msg: '添加成功'})
  })
});

router.post('/update', function (req, res, next) {
  var id = req.body.id;
  userModel.findById(id, function (err, data) {
    if(err){ return console.log(err); }
    data.password = req.body.password;
    data.email = req.body.email;
    data.save(function(err){
      res.json({code: 200, msg: '更新成功'});
    })
  })
});

router.get('/list', function(req, res, next) {
  userModel.find(function(err, data){
    if(err){ return console.log(err) }
    res.console.log(data)
    res.render('users/index',{
      user: data
    })
  })
});

module.exports = router;
