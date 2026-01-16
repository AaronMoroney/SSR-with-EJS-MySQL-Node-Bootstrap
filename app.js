const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/routes'));

// Port
app.listen(4000);

// Test connection
console.log('server is live');
