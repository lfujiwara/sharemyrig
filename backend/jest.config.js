module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coverageReporters: ['json', 'text', 'clover', 'lcov'],
}
