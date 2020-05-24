module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js?$': 'babel-jest',
  },
  testMatch: ['**/__tests__/_*.+(ts|tsx|js)'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
