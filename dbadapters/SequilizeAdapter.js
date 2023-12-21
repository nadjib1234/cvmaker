// sequelizeAdapter.js
const db = require('./models')

const DBAdapter = require('./DBadapterInterface')
class SequelizeAdapter extends DBAdapter {
  constructor() {
    super()
    this.CVModel = db.CV
  }

  async getCVById(id) {
    try {
      const cv = await this.CVModel.findByPk(id, { raw: true })
      if (!cv) {
        throw new Error('CV not found') // Throw a specific error message
      }
      return { ...cv }
    } catch (error) {
      throw new Error(`Error while fetching CV by ID: ${error.message}`)
    }
  }

  async postCV(cvData) {
    try {
      const createdCV = await this.CVModel.create(cvData)
      return { ...createdCV.get({ plain: true }) }
    } catch (error) {
      throw new Error(`Error while posting CV: ${error.message}`)
    }
  }
}

module.exports = SequelizeAdapter
