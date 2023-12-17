const CreateCVController = require('./createcv.controller');

describe('Create CV Controller', () => {
  let createCVController;
  let CVEntityMock;
  let CreateCVStub;

  beforeEach(() => {
    // Mock implementation for the CV entity
    CVEntityMock = jest.fn((id, name, skills, education, experience) => ({
      id,
      name,
      skills,
      education,
      experience,
    }));

    // Stub implementation for the BL
    CreateCVStub = {
      createCV: jest.fn(),
    };

    createCVController = new CreateCVController(CreateCVStub, CVEntityMock);
  });

  it('should create CV successfully', async () => {
    // Mock response from the use case
    const cvData = {
      id: 1,
      name: 'Jane Doe',
      skills: ['Java', 'Spring'],
      education: 'Information Technology',
      experience: 'Full Stack Developer',
    };
    CreateCVStub.createCV.mockResolvedValue(cvData);

    const req = { body: cvData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createCVController.createCV(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      name: 'Jane Doe',
      skills: ['Java', 'Spring'],
      education: 'Information Technology',
      experience: 'Full Stack Developer',
    });

    // Verify that the CV entity constructor was called with the correct parameters
    expect(CVEntityMock).toHaveBeenCalledWith(
      1,
      'Jane Doe',
      ['Java', 'Spring'],
      'Information Technology',
      'Full Stack Developer'
    );

    // Verify that the use case method was called with the correct parameters
    expect(CreateCVStub.createCV).toHaveBeenCalledWith(
      'Jane Doe',
      ['Java', 'Spring'],
      'Information Technology',
      'Full Stack Developer'
    );
  });

  it('should handle error while creating CV', async () => {
    // Mock error response from the use case
    const error = new Error('Failed to create CV');
    CreateCVStub.createCV.mockRejectedValue(error);

    const req = { body: { name: 'Jane Doe' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createCVController.createCV(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create CV' });

    // Verify that the use case method was called with the correct parameters
    expect(CreateCVStub.createCV).toHaveBeenCalledWith('Jane Doe', undefined, undefined, undefined);
  });
});
