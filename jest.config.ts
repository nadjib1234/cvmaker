// jest.config.js
module.exports = {
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
  runner: 'jest-circus/runner',
  // setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Commented out since you don't have this file
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/path/to/your/tests/**/*.test.ts'], // Update with your actual test path and extension
  moduleFileExtensions: ['js', 'mjs', 'ts', 'json', 'node'],
};
