var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/',
        failureFlash: true
    })
);

module.exports = router;
