const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

// serialize and deserialize are used inside passport
// but you need to implement them to tell passport how are you managing the cookie session thing
// serialize is recieving a user object and returning it's id to be hashed and put in the cookie
// deserialize is recieving an id from the cookie and checking if it matches a user 
passport.serializeUser( (user, done) => {
  done(null, user.id)
})
passport.deserializeUser( (id, done) => {
  User.findById(id).then(user => { done(null, user)} )
})
passport.use(new GoogleStrategy(
    // configuration
    {
      clientID: keys.GOOGLE_ClientID,
      clientSecret: keys.GOOGLE_ClientSecret,
      callbackURL: '/api/auth/google/callback' // same as google API Services callback
    }, (accessToken, refreshToken, profile, done) => {
      // checking if the user is logging in for the first time in this google id
      // not that google can have multiple emails for the same person, therefore we are using id to be more precise
      User.findOne({googleID: profile.id}) // async action
      .then(user => {
        // if user is not found in the database we need to create a new one
        if(!user){
          new User({
            googleID: profile.id,
            name: profile.displayName
          }).save()
          .then(user => done(null, user)) // error = null, user = user created
        } else {
          // not creating a new user in the database as we redirect them to the next authentication phase
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
