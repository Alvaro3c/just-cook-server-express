export default {
    testEnvironment: 'node',
    transform: {},
    extensionsToTreatAsEsm: ['.js'],
    moduleNameMapping: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    testMatch: ['**/tests/**/*.test.js'],
    collectCoverage: false, // Desactívalo temporalmente para debug
    verbose: true
};