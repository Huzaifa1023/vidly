const genre = require('./../routers/genres');
const customer = require('./../routers/customers');
const movie = require('./../routers/movies');
const rental = require('./../routers/rentals');
const user = require('./../routers/users');
const auth = require('./../routers/auth');
const { error } = require('../middleware');
const bp = require('body-parser');

module.exports = (app) => {
    app.use(bp.json());
    app.use(bp.urlencoded({ extended: true }));
    app.use('/api/genres', genre);
    app.use('/api/customers', customer);
    app.use('/api/movies', movie);
    app.use('/api/rentals', rental);
    app.use('/api/users', user);
    app.use('/api/auth', auth);
    app.use(error)
}