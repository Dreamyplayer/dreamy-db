'use strict';

const config = {
  preset: 'jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['dist', 'node_modules', '__tests__'],
  roots: ['<rootDir>/src'],
  verbose: true,
};

module.exports = config;
