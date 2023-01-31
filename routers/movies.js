const express = require('express');
const router = express.Router();
const { Movies,Genre } = require('../model/index');
const { validateMovie } = require('../validator/index');

router.get('/', async(req, res) => {
    const movies = await Movies.find().sort('title');
    res.send(movies)
});

router.post('/', async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) res.status(400).send('genre not found');
        const movie = new Movies({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name:genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRent:req.body.dailyRentalRent,
        })
        const result = await movie.save()
        res.send(result)
})

router.put('/:id',async (req, res) => {
    const movie = await Movies.findById(req.params.id);
    if (!movie) return res.status(404).send('movie is not found');

    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) res.status(400).send('genre not found');
    
        movie.set({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name:genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRent:req.body.dailyRentalRent,
        })
        const result = await movie.save()
        res.send(result)
    
})

router.delete('/:id', async (req, res) => {
        const movie = await Movies.findById(req.params.id);
        if (!movie) return res.status(404).send('movie is not found');
        const result = await movie.delete()
        res.send(result)
    
})
module.exports = router;