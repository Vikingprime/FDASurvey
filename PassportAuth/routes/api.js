/**
 * Created by sanji on 3/15/2016.
 */
var express = require('express');
var router = express.Router();

router.get('/getSurvey', function(req, res, next) {
    res.end('Test  string');
});

module.exports = router;
