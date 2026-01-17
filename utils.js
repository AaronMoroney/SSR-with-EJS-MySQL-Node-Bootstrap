const connection = require('./db/connection');
// get products
function getProducts(callback) {
    //get the products from the db
    connection.query('SELECT * FROM products', (err, rows) => {
        // error handling
        if (err) {
            console.error('Error retrieving data from the database', err);
            return cb(err);
        };
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
        callback(null, products);
    });
}

module.exports = { getProducts };