const express = require('express');
const router = express.Router();
const pages = require("../controllers/pages");

router.get('/', pages.home);
router.get('/pricing', pages.pricing);
router.get('/signup', pages.showSignup);
router.post('/signup', pages.signup);
router.get('/login', pages.showLogin);
router.post('/login', pages.login);

module.exports = router;
