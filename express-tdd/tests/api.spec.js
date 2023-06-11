const request = require('supertest');
const app = require('../app');

describe('GET /sum', () => {
 test('Return status 200 and sum data', 
 (done) => {
   request(app).get('/sum').send({x: 5, y: 10}).then(( res) => {
     expect(res.statusCode).toBe(200);
     expect(res.body).toHaveProperty('status');
     expect(res.body).toHaveProperty('message');
     expect(res.body.status).toBe(true);
     expect(res.body.message).toEqual("Parameters summarized!");
     expect(res.body.data.x).toEqual(5);
     expect(res.body.data.y).toEqual(10);
     expect(res.body.data.result).toEqual(15);
     done();
   });
 });
})

describe("POST /users", () => {
  describe("given a username and password", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      expect(response.statusCode).toBe(200)
    })
    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    test("response has userId", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      expect(response.body.userId).toBeDefined()
    })
  })

  describe("when the username and password is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        {username: "username"},
        {password: "password"},
        {}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/users").send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })

})