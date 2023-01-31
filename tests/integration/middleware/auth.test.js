const {User,Genre} = require('../../../model');
const request = require('supertest');
let server;
describe('auth middleware', () => {
    beforeEach(() => { server = require('../../../index') });
    afterEach(async() => {
        await Genre.deleteMany({});
        server.close();
    })

    let name;
    let token

    const exec = () => {
        return request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: name });
    }

    beforeEach(() => {
        token = new User().generateAuthToken();
    })
    it('should return 401 if token is not provided', async() => {
        token = '';
        const result = await exec();
        expect(result.status).toBe(401)
    })
    it('should return 400 if the token is invalid', async () => {
        token = 'a'
        const result = await exec();
        expect(result.status).toBe(400)
    })
    it('should return 200 if the token is valid', async () => {
        name = 'genre1'
        const result = await exec();
        expect(result.status).toBe(200)
    })
})  