const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

// home
router.get('/', (req, res) => {
	res.render('index');
});

// pricing
router.get('/pricing', (req, res) => {
	//get the products from the db
	connection.query('SELECT * FROM products', (err, rows) => {
        // error handling
		if (err) {
			console.error('Error retrieving data from the database', err);
			return res
				.status(500)
				.send('Error retrieving data from the database');
		}
        // normalise the benefits
		const products = rows.map((p) => {
			let benefits = p.product_benefits;

			if (typeof benefits === 'string') {
				try {
					benefits = JSON.parse(benefits);
				} catch {
					benefits = [];
				}
			}

            // spread the products back in with the normalised benefits
			return {
				...p,
				product_benefits: benefits,
			};
		});
        // pass the data to the pricing page
		res.render('pricing', { products });
	});
});

module.exports = router;
