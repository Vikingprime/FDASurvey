var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*router.post('/login', function(req,res,next){
  console.log("I Have entered" + req.body.username)

  res.end(req.body.username);
})*/

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/',
        failureFlash: true
    })
);

module.exports = router;
