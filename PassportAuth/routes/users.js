var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // checks whether user is logged in
  if(req.user){
    res.render('users');
  }
  else {
    res.redirect('/');
  };
});


module.exports = router;
