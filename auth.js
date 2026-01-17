const connection = require('./db/connection');

// middleware to test if authenticated
// not currently used
// function isAuthenticated (req, res, next) {
//   if (req.session.user) next()
//   else next('route')
// }

function createUser(email, name, password) {
	connection.query(
		`INSERT INTO users (email, name, password)
    VALUES (?, ?, ?)`,
		[email, password, name],
		(err) => {
			if (err) {
				console.error('Error creating user', err);
				return;
			}
		},
	);
}

function authenticateUser(email, password, callback) {
	connection.query(
		'SELECT id, email, password FROM users WHERE email = ? LIMIT 1',
		[email],
		(err, rows) => {
			if (err) {
				return callback(err);
			}

			const user = rows?.[0];
			if (!user) {
				return callback(null, false);
			}

			const ok = user.email === email && user.password === password;
			callback(null, ok);
		},
	);
}

module.exports = { createUser, authenticateUser };
