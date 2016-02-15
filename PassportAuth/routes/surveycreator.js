/**
 * surveycreator.js
 * FDASurvey
 * Tristan Kindig
 * 2016-2-14
 */
 
 
var express = require('express');
var passport = require('passport');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('surveycreator');
});


module.exports = router;
