// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
  runner: 'jest-circus/runner',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/entities/**/*.test.ts'], // Updated path
  moduleFileExtensions: ['js', 'mjs', 'ts', 'json', 'node'],
};
