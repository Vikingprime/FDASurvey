/**
 * Created by sanji on 3/15/2016.
 */
var express   = require('express');
var router = express.Router();

router.get('/getSurvey', function(req, res, next) {
    var x = { questions:
   [ { prompt: 'how smelly are you?' },
     { prompt: 'how fat are you?' },
     { prompt: 'what\'s your favorite tv show?' } ]
   };
//var headers = req.getAllResponseHeaders().toLowerCase();
//    console.log("Email addr:" +headers);
    console.log(req.headers.email);
    res.json(x);
});

module.exports = router;
