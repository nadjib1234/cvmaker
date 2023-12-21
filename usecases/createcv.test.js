// usecases/getandcreatecv.test.js
const GetAndCreateCV = require('./createcv')
const CV = require('../Entities/Cv')
const { describe, beforeEach, it, expect } = require('@jest/globals');

describe('Create CV', () => {
  let getAndCreateCV

  beforeEach(() => {
    // Stub implementation for successful postCV
    const successPostCVStub = {
      postCV: async (cvData) => ({
        id: Math.floor(Math.random() * 1000) + 1,
        name: cvData.name,
        skills: cvData.skills,
        education: cvData.education,
        experience: cvData.experience
      })
    }

    // Stub implementation for postCV with an error
    const errorPostCVStub = {
      postCV: async (cvData) => {
        throw new Error('Simulated error inserting CV data')
      }
    }

    // Create instances of GetAndCreateCV with different stubs for testing
    getAndCreateCV = new GetAndCreateCV(successPostCVStub)
    errorCreateCV = new GetAndCreateCV(errorPostCVStub)
  })

  it('should create CV successfully', async () => {
    const cvData = {
      name: 'Jane Doe',
      skills: ['Java', 'Spring'],
      education: 'Information Technology',
      experience: 'Full Stack Developer'
    }

    // Test the success case
    const result = await getAndCreateCV.createCV(
      cvData.name,
      cvData.skills,
      cvData.education,
      cvData.experience
    )

    expect(result).toBeInstanceOf(CV)
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(cvData.name)
    expect(result.skills).toEqual(cvData.skills)
    expect(result.education).toEqual(cvData.education)
    expect(result.experience).toEqual(cvData.experience)
  })

  it('should handle error while creating CV', async () => {
    const cvData = {
      name: 'Jane Doe',
      skills: ['Java', 'Spring'],
      education: 'Information Technology',
      experience: 'Full Stack Developer'
    }

    // Test the error case
    await expect(errorCreateCV.createCV(
      cvData.name,
      cvData.skills,
      cvData.education,
      cvData.experience
    )).rejects.toThrow('Simulated error inserting CV data')
  })
})