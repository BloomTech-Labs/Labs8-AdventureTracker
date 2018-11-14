const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// Use express middleware to handle cookies (JTW)
server.express.use(cookieParser());

// decode JWT to get user ID with every req
server.express.use((req, res, next) => {
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

server.start(
  {
    cors: {
      credentials: true,
      origin: [process.env.FRONTEND_URL, "https://adventure-tracker-frontend.netlify.com/"]
    }
  },
  details => {
    console.log(`Server is now running on http://localhost:${details.port}`);
  }
);
