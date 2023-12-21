// usecases/getcv.test.js
const GetCV = require('./getcv')
const CV = require('../Entities/Cv')
const { describe, beforeEach, it, expect } = require('@jest/globals');
describe('Get CV', () => {
  let getCV

  beforeEach(() => {
    // Stub implementation for successful getCVById
    const successGetCVByIdStub = {
      getCVById: async (id) => ({
        id,
        name: 'John Doe',
        skills: ['JavaScript', 'React'],
        education: 'Computer Science',
        experience: 'Software Developer'
      })
    }

    // Stub implementation for getCVById with an error
    const errorGetCVByIdStub = {
      getCVById: async () => {
        throw new Error('Simulated error fetching CV data')
      }
    }

    // Create instances of GetCV with different stubs for testing
    getCV = new GetCV(successGetCVByIdStub)
    getCVWithError = new GetCV(errorGetCVByIdStub)
  })

  it('should get CV by ID successfully', async () => {
    const cvId = 1
    const result = await getCV.getCV(cvId)

    expect(result).toBeInstanceOf(CV)
    expect(result.id).toEqual(cvId)
    expect(result.name).toEqual('John Doe')
    expect(result.skills).toEqual(['JavaScript', 'React'])
    expect(result.education).toEqual('Computer Science')
    expect(result.experience).toEqual('Software Developer')
  })

  it('should handle error during get CV by ID', async () => {
    const cvId = 1

    // Expect the async function to throw an error
    await expect(getCVWithError.getCV(cvId)).rejects.toThrowError(
      'Error in getCV: Simulated error fetching CV data'
    )
  })
})