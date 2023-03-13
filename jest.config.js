module.exports = {
  "setupFilesAfterEnv": [
    "<rootDir>/jest/setup.js"
  ],
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "collectCoverageFrom": ["src/**/*.js", "!src/index.js"],
  "coverageReporters": ["text"]
};