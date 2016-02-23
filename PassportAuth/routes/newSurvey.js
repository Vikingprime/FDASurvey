/**
 * Created by sanji on 2/21/2016.
 */
var express = require('express');
var router = express.Router();
var surveys = require("../models/surveyListModel");


router.get('/', function(req, res, next) {
    if(req.user){
        surveys.findOne({name: "Food Consumption"}, function (err, survey) {
            var myObj =  survey.questions;
            console.log("Logging myObj: " + JSON.stringify(myObj.fields));
            res.render('newSurvey', {JSONObj : myObj.fields});
        })
/*        var myObj = {
            "label": "New Survey BOO HOOO",
            "field_type": "text",
            "required": true,
            "field_options": {},
            "cid": "c1"
        };*/
/*        res.render('newSurvey', {JSONObj : myObj});*/
    }
    else {
        res.redirect('/');
    }
});

router.post('/updateSurvey', function (req, res, next){
    console.log("Just received updateSurvey: ");
    surveys.findOne({name: "Food Consumption"}, function (err, survey) {
        console.log("Survey= " +survey.name)
        survey.questions = req.body;
        survey.save(function(e){
            if(err) console.log(e);
            console.log(survey.questions);
        })
    });

})

router.post('/testPoint', function(req,res,next){
    res.end("TestPoint was called");
})

module.exports = router;