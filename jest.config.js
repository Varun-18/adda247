/* eslint-disable no-undef */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  moduleNameMapper: {
    '^routes$': '<rootDir>/src/routes',
    '^models$': '<rootDir>/src/models',
    '^utils$': '<rootDir>/src/utils',
    '^controllers$': '<rootDir>/src/controllers',
    '^middlewares$': '<rootDir>/src/middlewares',
    '^constant$': '<rootDir>/src/constant',
    '^controllers/category/validators$':
      '<rootDir>/src/controllers/category/validators',
    '^controllers/user/validators$':
      '<rootDir>/src/controllers/user/validators',
  },
};
