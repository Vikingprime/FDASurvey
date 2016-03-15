/**
 * Created by sanji on 2/20/2016.
 */
var express = require('express');
var router = express.Router();
var surveys = require('../models/surveyListModel');
var query = undefined;

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.user) {
        console.log("My paramter in renderSurvey.js is " + req.query.nm);
        query = req.query.nm;
        res.render('renderSurvey',{params: req.query.nm});
    }
    else {
        res.redirect('/');
    };
});

router.get('/formData', function (req, res){
/*    surveys.findOne({name: req.query.nm}, function (err, survey) {
        var myObj =  survey.questions;*/

    surveys.findOne({name: query}, function (err, survey) {
        var myObj = {};
        myObj.questions = survey.questions;
        myObj.editable = survey.editable;
        myObj.name = survey.name;
        myObj.id = survey._id;
        res.json(myObj);
    })
});

router.post('/saveSurvey', function(req,res){
    console.log("in body");
    console.log(req.body);
});
module.exports = router;