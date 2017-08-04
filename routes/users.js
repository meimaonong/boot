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


router.post('/login', function(req, res, next){

    var email = req.body.email;
    var password = req.body.password;

    userModel.findOne({email},function(err,data){   //通过此model以用户名的条件 查询数据库中的匹配信息  
      
      if(err){ 
                                                //错误就返回给原post处（login.html) 状态码为500的错误  
            res.send(500);  
            
            console.log(err);  
        }else if(!data){
                                          //查询不到用户名匹配信息，则用户名不存在  
            req.session.error = '用户名不存在';  
            res.send(404);                            //    状态码返回404  
            //    res.redirect("/login");  
        }else{  
          
            if(password != data.password){     //查询到匹配用户名的信息，但相应的password属性不匹配  
              res.send('tes4')  
              req.session.error = "密码错误";  
                
                //res.send(404);  
                //    res.redirect("/login");  
            }else{ 
                                                  //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功  
                req.session.user = data;  
                res.json({code:0, data: null, msg: '用户存在'});  
                //    res.redirect("/home");  
            }  
        }  
    }); 
});

module.exports = router;
