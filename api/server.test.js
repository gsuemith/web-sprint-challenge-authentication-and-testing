// Write your tests here

const request = require("supertest")
const db = require("../data/dbConfig.js")
const server = require('./server.js')

test('sanity', () => {
  expect(true).not.toBe(false) //I saw what you did there
})

beforeAll(async ()=>{
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('users').truncate()
})
afterAll(async () => {
  await db.destroy() // disconnects db
})

describe("server", () => {
  describe("[GET] /api/jokes", () => {
    it("is restricted by middleware", async () => {
      const res = await request(server).get("/api/jokes")
      expect(res.status).toBe(401)
      expect(res.text).toMatch(/.*token required.*/i)
    })
  })
})