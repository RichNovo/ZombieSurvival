export default {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  moduleNameMapper: {
    "^.+\\.css$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1", // Adjust for alias support
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
