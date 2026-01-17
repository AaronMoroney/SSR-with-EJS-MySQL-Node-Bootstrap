const express = require('express');
const app = express();
const session = require("express-session");
// parse body of forms
app.use(express.urlencoded({ 
  extended: true })
);
app.use(express.static('public'));
app.set('view engine', 'ejs');

// https://www.npmjs.com/package/express-session
app.use(session({
  // should be processed from .env
  // college project -> will suffice
  secret: "RANDOM_TOKEN_SECRET",
  resave: false,
  saveUninitialized: false
}));

// display current routes / user / if auth
// we can use to omit information, such as a button, nav
// or to add information, such as an auth'd user
// -> https://expressjs.com/en/api.html#res.locals
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.user = req.session.user || null;
  res.locals.authenticated = !!req.session.user;
  next();
});

// Routes
app.use('/', require('./routes/routes'));

// Port
app.listen(4000);

// Test connection
console.log('server is live');
