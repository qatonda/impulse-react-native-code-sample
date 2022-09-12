/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom',
  testMatch: [
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|react-tinder-card)/',
  ],
  collectCoverageFrom: ['./src/**/*.js', './src/**/*.ts'],
  collectCoverage: false,
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  setupFiles: ['./__tests__/helpers/async-storage-setup-mock.ts'],
};
