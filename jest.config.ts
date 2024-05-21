/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  preset: "ts-jest",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ["json", "text", "lcov", "clover"],
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    // ...
    "^@/components/(.*)$": "<rootDir>/components/$1",
  },

  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>"],

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\/]+$"],
  setupFilesAfterEnv: ["<rootDir>/config/jest/setupTests.ts"],
};

export default createJestConfig(config);
