module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/factories/**/*.{ts,tsx}',
    '!<rootDir>/src/presentation/components/router/**/*',
    '!<rootDir>/src/domain/**/index.ts',
    '!<rootDir>/src/infra/**/index.ts',
    '!<rootDir>/src/main/**/index.ts',
    '!<rootDir>/src/presentation/**/index.ts',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/validation/**/index.ts',
    '!**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)': 'ts-jest',
  },
  moduleNameMapper: {
      '@/(.*)': '<rootDir>/src/$1',
      '\\.scss$': 'identity-obj-proxy'
  }
};
