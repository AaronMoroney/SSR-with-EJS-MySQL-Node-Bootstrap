const mysql = require('mysql');

// create a connection to the mySQL db:
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'autoalt-hdip',
});

// connect to the db:
connection.connect((err) => {
	if (err) {
		console.log('ERROR CONNECTING', err);
	} else {
		console.log('connected to mySQL DB');
	}
});

module.exports = connection;
