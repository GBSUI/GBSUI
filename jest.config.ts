module.exports = {
    // A preset that is used as a base for Jest's configuration
    preset: "ts-jest",
    // The test environment that will be used for testing
    testEnvironment: "node",
    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,
    // The directory where Jest should output its coverage files
    coverageDirectory: "./coverage",
    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: [
        "**/*.tsx"
    ],
    coverageThreshold: {
        global: {
          branches: 80,
          functions: 100,
          lines: 80,
          statements: 80,
        },
    },
    reporters: [
        'default',
        [ 'jest-junit', {
                outputDirectory: "./coverage",
                outputName: "./coverage",
            }
        ]
    ]
};