/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
    preset: "ts-jest",
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    transform: { "^.+\\.[tj]s$": "ts-jest" },
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!starknet-url)"],
    globals: {
        "ts-jest": {
            tsconfig: {
                allowJs: true,
            },
        },
    },
};
