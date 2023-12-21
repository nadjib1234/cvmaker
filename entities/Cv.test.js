// cv.test.ts
/* global describe, beforeEach, beforeAll,it, afterEach, afterAll,expect, jest */

// Import the CV class using require
const CV = require('./Cv')

// Test suite for the CV class
describe('CV class', () => {
  let cv

  beforeEach(() => {
    cv = new CV(1, 'John Doe', ['JavaScript', 'React'], 'Computer Science', 'Software Developer')
  })

  it('should create a CV instance with correct initial properties', () => {
    expect(cv.id).toBe(1)
    expect(cv.name).toBe('John Doe')
    expect(cv.skills).toEqual(['JavaScript', 'React'])
    expect(cv.education).toBe('Computer Science')
    expect(cv.experience).toBe('Software Developer')
  })

  it('should update properties using setters', () => {
    cv.id = 2
    cv.name = 'Jane Doe'
    cv.education = 'Information Technology'
    cv.experience = 'Full Stack Developer'

    expect(cv.id).toBe(2)
    expect(cv.name).toBe('Jane Doe')
    expect(cv.education).toBe('Information Technology')
    expect(cv.experience).toBe('Full Stack Developer')
  })
})
