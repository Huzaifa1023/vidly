const { Rental,User } = require('../../../model');
const request = require('supertest');
const mongoose = require('mongoose');

describe('Rental', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;

    const exec = async () => {
        return request(server)
            .post('/api/rentals')
            .set('x-auth-token',token)
            .send({ customerId, movieId })
    }
    beforeEach(async() => {
        server = require('../../../index');
        customerId = mongoose.Types.ObjectId().toHexString();
        movieId = mongoose.Types.ObjectId().toHexString();
        token = new User().generateAuthToken();
        rental = new Rental({
            customer: {
                _id:customerId,
                name: '12345',
                phone: '1234567890',
            },
            movie: {
                _id:movieId,
                title: '12345',
                dailyRentalRate:20
            }
        })
        await rental.save()
    })
    afterEach(async() => {
        server.close();
        await Rental.deleteMany({})
    })

    it('should work',async () => {
        const result = await Rental.findById(rental._id);
        expect(result).not.toBeNull();
    })
    it('should return 401 if client is not logged in', async () => {
        token = ''
        const result = await exec();
        expect(result.status).toBe(401);
    })
})