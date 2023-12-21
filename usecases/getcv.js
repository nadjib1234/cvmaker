const CV = require('../Entities/Cv')

class GetCV {
  constructor (dbAdapter) {
    this.dbAdapter = dbAdapter
  }

  async getCV (cvId) {
    try {
      const cvData = await this.dbAdapter.getCVById(cvId)
      // Assuming the dbAdapter returns a plain object, reconstruct it into a CV entity
      return new CV(cvData.id, cvData.name, cvData.skills, cvData.education, cvData.experience)
    } catch (error) {
      // Handle errors, e.g., log them or throw a custom error
      throw new Error(`Error in getCV: ${error.message}`)
    }
  }
}

module.exports = GetCV