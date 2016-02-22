/**
 * Created by sanji on 2/20/2016.
 */
var express = require('express');
var router = express.Router();
var surveys = require('../models/surveyListModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.user){
        res.end ("Here you will find the details of <br> " + req.query.nm)
    }
    else {
        res.redirect('/');
    };
});

module.exports = router;