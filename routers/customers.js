const express = require('express');
const router = express.Router();
const { Customer } = require('../model/index');
const { validateCustomer } = require('../validator/index');

router.get('/', async(req, res) => {
    const customer = await Customer.find().sort('name');
    res.send(customer)
});

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

        const coustomer = new Customer({
            name: req.body.name,
            isGold: req.body.isGold,
            phone:req.body.phone
        })

        const result = await coustomer.save()
        res.send(result)
})

router.put('/:id',async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('customer with this id is not found');

    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

        customer.set({
            name: req.body.name,
            isGold: req.body.isGold,
            phone:req.body.phone
        })

        const result = await customer.save()
        res.send(result)
})

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('customer with this id is not found');
    const result = await customer.delete()
    res.send(result)
})
module.exports = router;