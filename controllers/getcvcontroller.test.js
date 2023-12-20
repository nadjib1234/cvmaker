const GetCVController = require('./getcv.controller')

describe('Get CV Controller', () => {
  let getCVController
  let CVEntityMock
  let geCVStub

  beforeEach(() => {
    // Mock implementation for the CV entity
    CVEntityMock = jest.fn((id, name, skills, education, experience) => ({
      id,
      name,
      skills,
      education,
      experience
    }))

    // Stub implementation for the BL
    geCVStub = {
      getCV: jest.fn()
    }

    getCVController = new GetCVController(geCVStub, CVEntityMock)
  })

  it('should get CV by ID successfully', async () => {
    // Mock response from the use case
    const cvData = {
      id: 1,
      name: 'John Doe',
      skills: ['JavaScript', 'React'],
      education: 'Computer Science',
      experience: 'Software Developer'
    }
    geCVStub.getCV.mockResolvedValue(cvData)

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await getCVController.getCV(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      name: 'John Doe',
      skills: ['JavaScript', 'React'],
      education: 'Computer Science',
      experience: 'Software Developer'
    })

    // Verify that the CV entity constructor was called with the correct parameters
    expect(CVEntityMock).toHaveBeenCalledWith(
      1,
      'John Doe',
      ['JavaScript', 'React'],
      'Computer Science',
      'Software Developer'
    )

    // Verify that the use case method was called with the correct parameter
    expect(geCVStub.getCV).toHaveBeenCalledWith(1)
  })

  it('should handle error while getting CV by ID', async () => {
    // Mock error response from the use case
    const error = new Error('CV not found')
    geCVStub.getCV.mockRejectedValue(error)

    const req = { params: { id: 2 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await getCVController.getCV(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ error: 'CV not found' })

    // Verify that the use case method was called with the correct parameter
    expect(geCVStub.getCV).toHaveBeenCalledWith(2)
  })
})
