class GetCVController {
    constructor(getCV, CVEntity) {
      this.getCVbl = getCV;
      this.CVEntity = CVEntity;
    }
  
    async getCV(req, res) {
      const cvId = req.params.id;
  
      try {
        const cvData = await this.getCVbl.getCV(cvId);
        const cv = new this.CVEntity(
          cvData.id,
          cvData.name,
          cvData.skills,
          cvData.education,
          cvData.experience
        );
  
        res.status(200).json(cv);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    }
  }
  
  module.exports = GetCVController;
  