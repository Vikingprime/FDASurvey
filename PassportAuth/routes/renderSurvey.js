/**
 * Created by sanji on 2/20/2016.
 */
var express = require('express');
var router = express.Router();
var surveys = require('../models/surveyListModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.user)

        {surveys.findOne({name: req.query.nm}, function (err, survey) {
        var myObj =  survey.questions;
        console.log("Logging myObj: " + JSON.stringify(myObj.fields));
        res.render('newSurvey', {JSONObj : myObj.fields});
    })

        //res.end ("Here you will find the details of <br> " + req.query.nm)
    }
    else {
        res.redirect('/');
    };
});

module.exports = router;