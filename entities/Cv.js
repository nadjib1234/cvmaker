// entities/CV.js

class CV {
  constructor(id, name, skills, education, experience) {
    this._id = id
    this._name = name
    this._skills = skills
    this._education = education
    this._experience = experience
  }

  get id() {
    return this._id
  }

  set id(id) {
    this._id = id
  }

  get name() {
    return this._name
  }

  set name(name) {
    this._name = name
  }

  get skills() {
    return this._skills
  }

  set skills(skills) {
    this._skills = skills
  }

  get education() {
    return this._education
  }

  set education(education) {
    this._education = education
  }

  get experience() {
    return this._experience
  }

  set experience(experience) {
    this._experience = experience
  }
}

module.exports = CV
