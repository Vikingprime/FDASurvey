var express = require('express');
var flash = require('connect-flash');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');
var signup = require('./routes/signup');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/signup',signup);
/*app.get('/signup', function (req, res) {
    res.send('SIGNUP');
});*/

// called via event - signup.js -> signup.ejs -> action="/newUser"
app.post('/newUser', passport.authenticate('signup', {
    successRedirect: '/users',
    failureRedirect: '/signup',
    failureFlash : true
}));

app.post('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});



//TESTING MONGOOSE
User = require('./models/usermodel');
var myUser = undefined;
User.find({username : "Sanjid"}, function(err, users) {
    if (err) throw err;

    // object of all the users
    console.log(users);
    myUser = users;
});
console.log(myUser);

// Passport session setup
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local',new LocalStrategy(
    function(username, password, done) {
        console.log("inLocalStrategy with username "+ username.toString());
        User.findOne({ username: username }, function (err, user) {
            //console.log(user.toString());
            if (err) { return done(err); }
            if (!user) {
                return done(null, false);
            }
            if (!user.validPassword(password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

passport.use('signup', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        console.log("Inside new user :" + username + " " + password);
        findOrCreateUser = function(){
            // find a user in Mongo with provided username
            User.findOne({'username':username},function(err, user) {
                // In case of any error return
                if (err){
                    console.log('Error in SignUp: '+err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('User already exists');
                    return done(null, false,
                        req.flash('message','User Already Exists'));
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser = new User();
                    // set the user's local credentials
                    newUser.username = username;
                    newUser.password = password;

                    // save the user
                    newUser.save(function(err) {
                        if (err){
                            console.log('Error in Saving user: '+err);
                            throw err;
                        }
                        console.log('User Registration succesful');
                        return done(null, newUser);
                    });
                }
            });
        };

        // Delay the execution of findOrCreateUser and execute
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    })
);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
