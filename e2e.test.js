/* global describe, beforeEach, beforeAll,it, afterEach, afterAll,expect, jest */

const request = require('supertest')
const app = require('./index') // Replace with the path to your main app file
const db = require('./dbadapters/models')
// Your test code...

describe('E2E Tests', () => {
  let createdCvId

  it('should create a CV', async () => {
    const createResponse = await request(app)
      .post('/createcv')
      .send({
        name: 'John Doe',
        skills: 'JavaScript, Node.js',
        education: 'Computer Science',
        experience: 'Full Stack Developer'
      })

    expect(createResponse.status).toBe(201)
    expect(createResponse.body).toHaveProperty('_id')
    createdCvId = createResponse.body._id
  })

  it('should retrieve a CV', async () => {
    // Ensure the CV was created in the previous test
    expect(createdCvId).toBeDefined()

    const getResponse = await request(app)
      .get(`/getcv/${createdCvId}`)
      .send()

    expect(getResponse.status).toBe(200)
    expect(getResponse.body).toHaveProperty('_id')
    expect(getResponse.body._name).toBe('John Doe')
    // Add more assertions based on your data
  })

  // Cleanup logic after all tests
  afterAll(async () => {
    // Clean up created CV using Sequelize destroy method
    if (createdCvId) {
      await db.CV.destroy({
        where: { id: createdCvId }
      })
    }
  })
})
