/**
 * Created by sanji on 2/8/2016.
 */
var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('signup');
    //res.end("LoginPage!");
});



module.exports = router;