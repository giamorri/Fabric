// jest.config.js
module.exports = {
    setupFilesAfterEnv: ['./jest.setup.js'],  // Points Jest to your setup file
    testEnvironment: 'jsdom',  // Ensures tests run in a browser-like environment
  };
  