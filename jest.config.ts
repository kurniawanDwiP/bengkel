import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",

  // agar alias @/ bisa dipakai
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  testMatch: ["**/__tests__/**/*.spec.ts"],
  clearMocks: true,
};

export default config;

