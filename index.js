const app = require('express')();
const API = require('./api');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const middlewares = require('./middlewares');
const keys = require('./config/keys');
const mongoose = require('mongoose');
require('./models/user');
require('./services/passport');

// env
require('dotenv').config();
// cross origin enabled
app.use(cors());

// configuring cookies
app.use(cookieSession({
  maxAge: 30*24*60*60*1000, // 30 days
  keys: [keys.COOKIE_KEY]
}));
app.use(passport.initialize());
app.use(passport.session());

// auth api by instructor
// require('./api/auth')(app); // by instructor


// all our /api calls gets routed here
app.use('/api', API);
// just a response with 404 statusCode and a message
app.use("*", middlewares.m404);
// port assigning depending on environment
const PORT = process.env.PORT || 3000;
// MongoDB Connect
mongoose.connect(keys.MONGO_DB_URI)
.then(db => {
  console.log("✔ Connected to MongoDB.");
  // starting to listed to requests on the port in .env or in the deployment env port specified
  app.listen(PORT, error => {
    error
    ?
    console.log("✖ Something went wrong, could not launch server on", PORT)
    :
    console.log("✔ NodeJS/ExpressJS running on port", PORT)
  })
})
.catch( error => {
  console.log("✖ Could not connect to MongoDB.");
  console.log("✖ Could not launch application without connecting to MongoDB.");
  console.log(error);
})
