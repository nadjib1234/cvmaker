/* global describe, beforeEach, it, expect, jest */

const SequelizeAdapter = require('./SequilizeAdapter')
const db = require('./models')

describe('Sequelize Adapter', () => {
  beforeAll(async () => {
    // Ensure the CV table exists or create it
    await db.CV.sync()
    dbAdapter = new SequelizeAdapter()
  })

  beforeEach(async () => {
    dbAdapter = new SequelizeAdapter()
  })

  afterEach(async () => {
    await db.CV.destroy({
      where: {},
      truncate: true, // Reset auto-increment counter
      cascade: true // Delete associated records (if any)
    })
  })

  it('should get CV by ID from Sequelize', async () => {
    // Insert a test CV into the database
    const insertedCV = await db.CV.create({
      name: 'John Doe',
      skills: ['JavaScript', 'React'],
      education: 'Computer Science',
      experience: 'Software Developer'
    })

    const cv = await dbAdapter.getCVById(insertedCV.id)

    // Assertions
    expect(cv).toBeDefined()
    expect(cv.id).toEqual(insertedCV.id)
    expect(cv.name).toEqual(insertedCV.name)
  })

  it('should post CV to Sequelize', async () => {
    const cvData = {
      name: 'Jane Doe',
      skills: ['Java', 'Spring'],
      education: 'Information Technology',
      experience: 'Full Stack Developer'
    }

    const result = await dbAdapter.postCV(cvData)

    // Assertions
    expect(result).toBeDefined()
    expect(result.name).toEqual(cvData.name)
  })

  it('should handle not found error when fetching CV by ID', async () => {
    const invalidId = -1000

    // Assertions
    await expect(dbAdapter.getCVById(invalidId)).rejects.toThrowError('CV not found')
  })

  it('should handle error when fetching CV by ID', async () => {
    const invalidId = 'aaa'

    // Assertions
    await expect(dbAdapter.getCVById(invalidId)).rejects.toThrowError(
      /Error while fetching CV by ID:/
    )
  })

  it('should handle error when posting CV', async () => {
    // Attempt to post a CV with invalid data (assuming missing 'name' is invalid)
    const invalidCVData = {
      skills: ['Java', 'Spring'],
      education: 'Information Technology',
      experience: 'Full Stack Developer'
    }

    // Assertions
    await expect(dbAdapter.postCV(invalidCVData)).rejects.toThrowError(
      /Error while posting CV:/
    )
  })
})
