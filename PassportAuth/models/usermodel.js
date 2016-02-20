/**
 * Created by sanji on 2/7/2016.
 */
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/mongooseDB');
var Schema = mongoose.Schema;
var loginSchema = new Schema ({
    username: String,
    password: String
});

loginSchema.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    console.log("Valid Password? " + pwd);
    return ( this.password === pwd );
};

var usermodel = mongoose.model('usermodel', loginSchema,'usermodels');



module.exports = usermodel;