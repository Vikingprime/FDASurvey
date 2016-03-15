/**
 * Created by sanji on 2/23/2016.
 */
var express = require('express');
var router = express.Router();
var surveys = require('../models/surveyListModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.user){
        var myName= req.user.username;
        var surveyName = req.query.nm;
        findParticipants(myName, surveyName, function(data){
            console.log("participants = " + data);
            res.render('participants', { participants: data, name:surveyName });
        } );
    }
    else {
        res.redirect('/');
    };
});

router.get('/addParticipants', function (req,res,next){
    console.log(req.query.participantEmail);
    res.end("Not done yet");
} )

function findParticipants(username, surveyName, cb){
    surveys.find({username : username,  name: surveyName}, function(err, survey) {
        if (err) throw err;
        cb(survey[0].participants);
    });
}

module.exports = router;

