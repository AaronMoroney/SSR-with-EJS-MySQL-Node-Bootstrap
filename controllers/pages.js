const auth = require('../auth');
const utils = require("../utils");

exports.home = (req, res) => res.render('index');
exports.showLogin = (req, res) => res.render('login');
exports.showSignup = (req, res) => res.render('signup');

exports.pricing = (req, res) => {
	utils.getProducts((err, products) => {
		if (err) return res.status(500).send('Error retrieving products');
		res.render('pricing', { products });
	});
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  auth.authenticateUser(email, password, (err, authenticated) => {
    if (err) {
      console.error("Auth DB error:", err);
      return res.status(500).send("Server error");
	  }

    if (!authenticated) {
      return res.render("login");	
    } 

    utils.getProducts((err, products) => {
      if (err) return res.status(500).send("Error retrieving products");
      res.render("pricing", { products});
    });
  });
};

exports.signup = (req, res) => {
  const { email, password, name } = req.body;

	auth.createUser(email, password, name);
	res.render('login');
};