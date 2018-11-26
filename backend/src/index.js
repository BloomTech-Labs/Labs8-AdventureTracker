const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const cookieParser = require('cookie-parser');
var secure = require('express-force-https');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();
const express = server.express;

// enforce HTTPS for all URLS
express.use(secure);

// Use express middleware to handle cookies (JTW)
express.use(cookieParser());

// decode JWT to get user ID with every req
express.use((req, res, next) => {
  // get the token from req
  const { token } = req.cookies;

  if (token) {
    // get the userId, use verify & secret to make sure not modified
    const { userId } = jwt.verify(token, process.env.APP_SECRET);

    // add the userId to req for future requests
    req.userId = userId;

    console.log('USERID', userId);
  }
  next();
});
express.use(passport.initialize());

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      // User grants permission and this is the callbackURL of what route
      // we want the user to go through
      callbackURL: 'https://adventuretracker.now.sh/auth/facebook/callback',
      // callbackURL: '/auth/facebook/callback',
      // Specifying what fields I want from Facebook
      profileFields: ['id', 'displayName', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
      //This happens first before the callbackURL happens.
      //The profile argument contains the needed information
      // it is an object
      done(null, profile);
    }
  )
);
// Once the user clicks the button, the user goes to facebook for authentication
// passport handles the facebook authentication
express.get('/auth/facebook', passport.authenticate('facebook'));

express.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  function(req, res) {
    console.log('EVERYTHING GOOD TO GO!');
    // req.user is the profile information
    console.log(req.user);

    // successful authentication, go to page we specify such as /triplist
    // res.send('auth was good');
    let postLoginPath = 'https://adventure-tracker-frontend.netlify.com/facebooklogin';
    res.redirect(postLoginPath);
  }
);

server.start(
  {
    cors: {
      credentials: true,
      origin: [process.env.FRONTEND_URL, 'https://adventure-tracker-frontend.netlify.com']
    }
  },
  details => {
    console.log(`Server is now running on http://localhost:${details.port}`);
  }
);
