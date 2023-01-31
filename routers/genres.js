const express = require('express');
const router = express.Router();
const { Genre } = require('../model/index');
const { validateGenre } = require('../validator/index');
const {auth,isAdmin,validateObjectId} = require('../middleware');

router.get('/', async (req, res) => {
        const genres = await Genre.find().sort('name');
        res.send(genres)
});

router.get('/:id', validateObjectId,async (req,res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('Genre is not found');
    res.send(genre)
})
router.post('/',auth, async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

        const genre = new Genre({
            name:req.body.name
        })
        const result = await genre.save()
        res.send(result)
})

router.put('/:id',validateObjectId ,async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('genre with this id is not found');

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

        genre.set({
            name:req.body.name
        })
        const result = await genre.save()
        res.send(result)
})

router.delete('/:id', [auth, isAdmin], async (req, res) => {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).send('genre with this id is not found');
        const result = await genre.delete()
        res.send(result)
    
})
module.exports = router;