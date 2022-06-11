const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser( (user, done) => {
  done(null, user.id)
})
passport.deserializeUser( (id, done) => {
  console.log("ID", id);
  User.findById(id).then(user => { done(null, user)} )
})
passport.use(new GoogleStrategy(
    // configuration
    {
      clientID: keys.GOOGLE_ClientID,
      clientSecret: keys.GOOGLE_ClientSecret,
      callbackURL: '/api/auth/google/callback' // same as google API Services callback 
    }, (accessToken, refreshToken, profile, done) => {
      User.findOne({googleID: profile.id}) // async action
      .then(user => {
        if(!user){
          new User({
            googleID: profile.id,
            name: profile.displayName
          }).save()
          .then(user => done(null, user)) // error = null, user = user created
        } else {
          done(null, user); // error = null, user = user already existing
        }
      })
      .catch(error => {
        console.log("✖ Something went wrong, could not fetch user.");
        console.log(error);
      })
    }
  )
);
