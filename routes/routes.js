const express = require('express');
const router = express.Router();
const pages = require("../controllers/pages");
const auth = require("../auth");

//public
router.get('/', pages.home);
router.get('/pricing', pages.pricing);
router.get('/signup', pages.showSignup);
router.post('/signup', pages.signup);
router.get('/login', pages.showLogin);
router.post('/login', pages.login);

//protected
router.get('/logout', pages.logout);
//router.get('/cart', auth.isAuthenticated, pages.cart);
//router.get('/cart', auth.isAuthenticated, pages.dashboard);

module.exports = router;
