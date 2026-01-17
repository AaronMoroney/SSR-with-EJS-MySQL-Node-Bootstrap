const express = require('express');
const app = express();
// parse body of forms
app.use(express.urlencoded({ 
  extended: true })
);
app.use(express.static('public'));
app.set('view engine', 'ejs');

// display current routes
// we can use to omit information, such as a button
// or to add information, such as an auth'd user
// -> https://expressjs.com/en/api.html#res.locals
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

// Routes
app.use('/', require('./routes/routes'));

// Port
app.listen(4000);

// Test connection
console.log('server is live');
