const request = require("supertest");
const { Genre, User } = require("../../../model");
const mongoose = require("mongoose");

let server;
describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../../index");
  });

  afterEach(async () => {
    server.close();
    await Genre.deleteMany({});
  });

  describe("GET /", () => {
    it("should return list of genres", async () => {
      await Genre.insertMany([{ name: "genre1" }, { name: "genre2" }]);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.some((g) => g.name == "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name == "genre2")).toBeTruthy();
    });
  });

  describe("GET:id /", () => {
    it("should return a single genre", async () => {
      const genre = new Genre({ name: "Genre1" });
      await genre.save();
      const res = await request(server).get(`/api/genres/${genre._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return 404 when genre is not found", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get(`/api/genres/${id}`);
      expect(res.status).toBe(404);
    });
    
  });

  describe("POST /", () => {
      let name;
      let token;
      const exec = async() => {
          return await request(server)
          .post("/api/genres")
          .set("x-auth-token", token)
          .send({ name: name });
      };
      beforeEach(() => {
          token = new User().generateAuthToken()
      })
      it("should return 401 if the client is not logged in", async () => {
          token = ''
          const result = await exec()
        expect(result.status).toBe(401);
      });

      it("should return 400 if the name length is < 5", async () => {
        name = '1234'
        const result = await exec()
        expect(result.status).toBe(400);
      });

      it("should return 400 if the name length is > 50", async () => {
        name = new Array(52).join("a");
        const result = await exec()
        expect(result.status).toBe(400);
      });

      it("should save the genre if it is valid", async () => {
        name = 'genre1'
        await exec()
        const genre = await Genre.find({ name });
        expect(genre).not.toBeNull();
      });
      it("should return the genre if it is vallid", async () => {
        name = 'genre1'
        const res = await exec();
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("name", name);
      });
  });
  
  describe('PUT:id/', () => {
    let name;
    let token;
    let id;
    const exec = async () => {
        return await request(server)
        .put(`/api/genres/${id}`)
        .set("x-auth-token", token)
        .send({ name });
    };
    beforeEach(() => {
      token = new User().generateAuthToken()
    })
    
    it('should return 404 if genre is not found', async() => {
      id = mongoose.Types.ObjectId().toHexString();
      const res = await exec()
      expect(res.status).toBe(404)
    }) 

    it('should return 400 if genre is not valid', async() => {
      const genre = new Genre({ name: 'Genre1' });
      await genre.save()
      id = genre._id;
      name = '1234'
      const res = await exec()
      expect(res.status).toBe(400)
    }) 

    it('should save the genre if the it is valid', async() => {
      const genre = new Genre({ name: 'Genre1' });
      await genre.save()
      id = genre._id;
      name = 'genre2'
      const res = await exec()
      expect(res.status).toBe(200)
    })
  })

  describe('DELETE:id/', () => {
    let name;
    let token;
    let id;
    const exec = async () => {
        return await request(server)
        .delete(`/api/genres/${id}`)
        .set("x-auth-token", token)
        .send({ name });
    };
    beforeEach(() => {
      token = new User({isAdmin:true}).generateAuthToken()
    })
    it('should return 404 if genre is not found', async() => {
      id = mongoose.Types.ObjectId().toHexString();
      const res = await exec()
      expect(res.status).toBe(404)
    }) 

    it('should delete the gender if it is found', async() => {
      const genre = new Genre({ name: 'Genre1' });
      await genre.save()
      id = genre._id;
      const res = await exec()
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('name',genre.name)
    })
  })
});
