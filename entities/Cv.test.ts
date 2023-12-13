// cv.test.ts

// Import the CV class
import CV from "./Cv";

// Test suite for the CV class
describe('CV class', () => {
  // Test case for CV class instantiation
  describe('Instantiation', () => {
    let cv: CV;

    beforeEach(() => {
      cv = new CV(1, 'John Doe', ['JavaScript', 'React'], 'Computer Science', 'Software Developer');
    });

    it('should create a CV instance with correct initial properties', () => {
      expect(cv.id).toBe(1);
      expect(cv.name).toBe('John Doe');
      expect(cv.skills).toEqual(['JavaScript', 'React']);
      expect(cv.education).toBe('Computer Science');
      expect(cv.experience).toBe('Software Developer');
    });

    it('should update properties using setters', () => {
      cv.id = 2;
      cv.name = 'Jane Doe';
      cv.education = 'Information Technology';
      cv.experience = 'Full Stack Developer';

      expect(cv.id).toBe(2);
      expect(cv.name).toBe('Jane Doe');
      expect(cv.education).toBe('Information Technology');
      expect(cv.experience).toBe('Full Stack Developer');
    });
  });

  // Additional test cases can be added here
});
