class CreateCVController {
  constructor(createCVUseCase, CVEntity) {
    this.createCVUseCase = createCVUseCase
    this.CVEntity = CVEntity
  }

  async createCV(req, res) {
    const { name, skills, education, experience } = req.body

    try {
      const cvData = await this.createCVUseCase.createCV(
        name,
        skills,
        education,
        experience
      )
      const cv = new this.CVEntity(
        cvData.id,
        cvData.name,
        cvData.skills,
        cvData.education,
        cvData.experience
      )

      res.status(201).json(cv)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}

module.exports = CreateCVController
