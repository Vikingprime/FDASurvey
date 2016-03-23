/**
 * Created by sanji on 2/23/2016.
 */
var express = require('express');
var router = express.Router();
var surveys = require('../models/surveyListModel');
var participants = require('../models/participantModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.user){
        var myName= req.user.username;
        var surveyName = req.query.nm;
        var surveyId = req.query.id;
        console.log("Id of survey" + surveyId);
        findParticipants(myName, surveyName, function(data){
            res.render('participants', { participants: data, name:surveyName, surveyID:surveyId });
        } );
    }
    else {
        res.redirect('/');
    };
});

router.post('/addParticipants', function (req,res,next){
    console.log("Id= " +req.query.id);
    console.log(req.query.participantEmail);
    participants.update({email:req.query.participantEmail},{$push:{}})
    res.end("Not done yet");
} )

function findParticipants(username, surveyName, cb){
    surveys.find({username : username,  name: surveyName}, function(err, survey) {
        if (err) throw err;
        cb(survey[0].participants);
    });
}

module.exports = router;

