/**
 * Created by sanji on 2/23/2016.
 */

var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/mongooseDB');
var Schema = mongoose.Schema;
var participantSchema = new Schema ({
    name: String,
    password: String,
    email: String,
    surveys: {type:Array, default:[]}
});

/*
loginSchema.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    console.log("Valid Password? " + pwd);
    return ( this.password === pwd );
};
*/

var participants = mongoose.model('participants', participantSchema);



module.exports = participants;