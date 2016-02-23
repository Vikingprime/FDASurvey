var express = require('express');
var router = express.Router();
var surveys = require('../models/surveyListModel');
var participants = require('../models/participantModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.user){
    var myName = req.user.username;
    showSurveys(myName, function(data){
        res.render('users', { surveys: data, name:myName });
    } );
  }
  else {
    res.redirect('/');
  };
});

function showSurveys(username, cb){
    surveys.find({username : username}, function(err, users) {
        if (err) throw err;
        var str = [];
        for(var i = 0; i < users.length; i++){
            str[i] = users[i].name;
        }
        cb(str);
    });
}
module.exports = router;
