const auth = require('../auth');
const utils = require('../utils');

exports.home = (req, res) => res.render('index');
exports.showLogin = (req, res) => res.render('login');
exports.showSignup = (req, res) => res.render('signup');

exports.pricing = (req, res) => {
	utils.getProducts((err, products) => {
		if (err) return res.status(500).send('Error retrieving products');
		res.render('pricing', { products });
	});
};

exports.login = (req, res, next) => {
	const { email, password } = req.body;

	auth.authenticateUser(email, password, (err, authenticated) => {
		if (err) {
			console.error('Auth DB error:', err);
			return res.status(500).send('Server error');
		}

		if (!authenticated) {
			return res.render('login');
		}

		// https://www.npmjs.com/package/express-session
		req.session.regenerate(function (err) {
			if (err) {
				next(err);
			}

			// store user information in session, typically a user id
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
	const { email, password, name } = req.body;

	auth.createUser(email, password, name);
	res.render('login');
};

// https://www.npmjs.com/package/express-session
exports.logout = (req, res, next) => {
	// logout logic

	// clear the user from the session object and save.
	// this will ensure that re-using the old session id
	// does not have a logged in user
	req.session.user = null;
	req.session.save(function (err) {
		if (err) {
			next(err);
		}

		// regenerate the session, which is good practice to help
		// guard against forms of session fixation
		req.session.regenerate(function (err) {
			if (err) {
				next(err);
			}
			res.redirect('/');
		});
	});
};
