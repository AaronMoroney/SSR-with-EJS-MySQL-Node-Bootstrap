const auth = require('../auth');
const utils = require('../utils');

exports.home = (req, res) => res.render('index');

exports.showSignup = (req, res) =>
	res.render('signup', {
		// pass some empty values for error to prevent a page crash
		error: null,
		values: {},
	});

exports.showLogin = (req, res) =>
	res.render('login', {
		// pass some empty values for error to prevent a page crash
		error: null,
		values: {},
	});

exports.login = (req, res, next) => {
	const { email, password } = req.body;

	auth.authenticateUser(email, password, (err, result) => {
		// account for db errors
		if (err) {
			console.error('Auth DB error:', err);
			return res.status(500).send('Server error');
		}

		if (!result.authenticated) {
			return res.render('login', {
				error: result.message,
				// repopulate form
				values: { email },
			});
		}

		// ** some ** below logic and associated comments can be found here
		// https://www.npmjs.com/package/express-session
		// create a session
		req.session.regenerate(function (err) {
			if (err) {
				next(err);
			}

			// store user information in session
			// in this case I will use email
			req.session.user = req.body.email;

			// save the session before redirection to ensure page
			// load does not happen before session is saved
			req.session.save(function (err) {
				if (err) {
					return next(err);
				}
				return res.redirect(303, '/pricing');
			});
		});
	});
};

exports.signup = (req, res) => {
	const { email, password, confirmPassword } = req.body;

	auth.createUser(email, password, confirmPassword, (err, result) => {
		if (err) {
			console.error("Create user DB error:", err);
			return res
				.status(500)
				.send("Server error");
		}

		if (!result.ok) {
			return res.render('signup', {
				error: result.message,
				// repopulate form
				values: { email },
			});
		}
		return res.redirect("/login")
	});
};

// below logic and associated comments can be found here
// https://www.npmjs.com/package/express-session
exports.logout = (req, res, next) => {
	// logout logic
	req.session.user = null;
	req.session.save(function (err) {
		if (err) {
			next(err);
		}

		req.session.regenerate(function (err) {
			if (err) {
				next(err);
			}
			res.redirect('/');
		});
	});
};

exports.pricing = (req, res) => {
	utils.getProducts((err, products) => {
		if (err) return res
			.status(500)
			.send('Error retrieving products');

		res.render('pricing', { products });
	});
};
