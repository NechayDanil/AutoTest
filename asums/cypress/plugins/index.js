/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}

const dotenv = require('dotenv');
dotenv.config();

module.exports = (on, config) => {
  config.env = config.env || {};

  Object.keys(process.env).forEach((key) => {
    if (key.startsWith('CYPRESS_')) {
      config.env[key] = process.env[key];
    }
  });

  return config;
}