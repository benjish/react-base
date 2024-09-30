module.exports = {
    preset: 'ts-jest/presets/default-esm',
    transform: {
        "^.+\\.tsx?$": ['ts-jest', {
            // Les options spécifiques à ts-jest peuvent être définies ici.
            useESM: true,
        }],
    },
    testEnvironment: 'jsdom',
    extensionsToTreatAsEsm: ['.ts','.jsx','.tsx'],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
};
