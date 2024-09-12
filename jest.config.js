/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
      isolatedModules: true,
    },
  },
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|js|html)$": "ts-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!@ionic|@ionic/angular|@ionic/core|@stencil|@angular|@ngrx)",
  ],
  roots: ["src"],
  moduleNameMapper: {
    "@app/(.*)": "<rootDir>/src/app/$1",
    uuid: require.resolve("uuid"),
  },
  moduleFileExtensions: ["ts", "html", "js", "json", "mjs"],
  coverageReporters: ["html"],
};
