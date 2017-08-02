var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var session = require('express-session');
var jwt = require('jsonwebtoken');


var User = require('../models/user');
var url = 'https://voter-app1.herokuapp.com';
var url1 = 'http://localhost:3000';


passport.use(new Strategy({
  consumerKey: process.env.CONSUMERKEY,
  consumerSecret: process.env.CONSUMERSECRET,
  callbackUrl: this.url + '/twitter/return',
}, function(token, tokenSecret, profile, callback) {
            return callback(null, profile);
   }
));


passport.serializeUser(function(user, callback) {
  callback(null, user);
})

passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
})


router.use(session({secret: 'whatever', resave: true, saveUninitialized: true}))
router.use(passport.initialize());
router.use(passport.session());



router.get('/login', passport.authenticate('twitter'))

router.get('/return', passport.authenticate('twitter', {
  failureRedirect: '/'
}), function(req, res, next) {
      var username = req.user.username;
      var displayname = req.user.displayName;
      var userDB = new User({
        displayName: displayname,
        userName: username
      });
      User.findOne({userName: username}, function(err, founduser) {
        if (founduser) {
          var token = jwt.sign({user: founduser}, 'secret',  {expiresIn: 14400});
          res.redirect('/?valid=' + displayname + '&token=' + token + '&userid=' + founduser._id );
        }
        if (!founduser) {
          userDB.save();
          var token = jwt.sign({user: userDB}, 'secret',  {expiresIn: 14400});
          res.redirect('/?valid=' + displayname + '&token=' + token + '&userid=' + userDB._id);
        }
      })

    }
)



module.exports = router;
