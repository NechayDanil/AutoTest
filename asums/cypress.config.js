const { defineConfig } = require("cypress");
const dotenv = require('dotenv');

dotenv.config();

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://asumspreprod-client.promit-ek.ru',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1920, viewportHeight: 1080,
    setupNodeEvents(on, config) {
      require('dotenv').config();
      return config;
      // implement node event listeners here
    },
  },
});
