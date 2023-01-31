const { User } = require('../../../model/index');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

describe('user.generateAuthToken', () => {
    it('should return valid auth token', () => {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin:true,
        }
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decode =  jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decode).toHaveProperty('id',user.id);
        expect(decode).toHaveProperty('isAdmin',user.isAdmin);
    })
})