const Joi = require('joi');

const genreSchema = Joi.object({
    name:Joi.string().required().min(5).max(50).lowercase()
})

const customerSchema = Joi.object({
    name: Joi.string().required().min(5).max(50),
    isGold: Joi.boolean(),
    phone:Joi.string().required().min(7).max(15)
})

const movieSchema = Joi.object({
    title: Joi.string().required().min(5).max(255),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRent:Joi.number().min(0).max(255).required()
})

const rentalSchema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
})


const userSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email:Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required()
})

const authSchema = Joi.object({
    email:Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required()
})

const validateGenre = (genre) => {
    const result = genreSchema.validate(genre);
    return result
}

const validateCustomer = (customer) => {
    const result = customerSchema.validate(customer);
    return result
}

const validateMovie = (movie) => {
    const result = movieSchema.validate(movie);
    return result
}

const validateRental = (rental) => {
    const result = rentalSchema.validate(rental);
    return result
}

const validateUser = (user) => {
    const result = userSchema.validate(user);
    return result
}
const validateAuth = (req) => {
    const result = authSchema.validate(req);
    return result
}

module.exports = {
    validateGenre,
    validateCustomer,
    validateMovie,
    validateRental,
    validateUser,
    validateAuth
}