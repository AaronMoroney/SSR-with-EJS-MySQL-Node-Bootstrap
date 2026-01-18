const connection = require('./db/connection');

// middleware to test if authenticated
// not currently used
// function isAuthenticated (req, res, next) {
//   if (req.session.user) next()
//   else next('route')
// }

function createUser(email, password, confirmPassword, callback) {
	// account for missing data
	if (!email || !password || !confirmPassword) {
		return callback(null, {
			ok: false,
			message: 'Email and passwords are required',
		});
	}

	// account for passwords do not match
	if (password !== confirmPassword) {
		return callback(null, {
			ok: false,
			message: 'Passwords do not match',
		});
	}

	connection.query(
		`INSERT INTO users (email, password) VALUES (?, ?)`,
		[email, password],
		// account for db errors
		(err, result) => {
			if (err) {
				console.log(err);
				return callback(err);
			}

			return callback(null, {
				ok: true,
			});
		},
	);
}

function authenticateUser(email, password, callback) {
	connection.query(
		'SELECT id, email, password FROM users WHERE email = ? LIMIT 1',
		[email],
		(err, rows) => {
			// account for db errors
			if (err) {
				console.log(err);
				return callback(err);
			}

			const user = rows?.[0];

			// account for users not found
			if (!user) {
				return callback(null, {
					authenticated: false,
					message: `No account found for ${email}`,
				});
			}

			const authenticated =
				user.email === email && user.password === password;

			// account for incorrect password
			if (!authenticated) {
				return callback(null, {
					authenticated: false,
					message: 'incorrect password',
				});
			}

			callback(null, {
				authenticated: true,
			});
		},
	);
}

module.exports = { createUser, authenticateUser };
