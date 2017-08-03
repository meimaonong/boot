var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.console.log("Hello from your server :)");
  // res.render('index', { title: 'Express' });

  res.render('site/index');
});



module.exports = router;
