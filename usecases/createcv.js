const CV = require('../Entities/Cv')

class CreateCV {
  constructor(dbAdapter) {
    this.dbAdapter = dbAdapter
  }

  async createCV(name, skills, education, experience) {
    try {
      const cvData = await this.dbAdapter.postCV({
        name,
        skills,
        education,
        experience,
      })
      // Assuming the dbAdapter returns a plain object, reconstruct it into a CV entity
      return new CV(
        cvData.id,
        cvData.name,
        cvData.skills,
        cvData.education,
        cvData.experience
      )
    } catch (error) {
      // Handle errors, e.g., log them or throw a custom error
      throw new Error(`Error in createCV: ${error.message}`)
    }
  }
}

module.exports = CreateCV
