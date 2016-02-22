/**
 * Created by sanji on 2/21/2016.
 */
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    if(req.user){
        res.render('newSurvey');
    }
    else {
        res.redirect('/');
    };
});

module.exports = router;