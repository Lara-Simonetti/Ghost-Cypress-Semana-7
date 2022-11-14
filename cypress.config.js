const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:'http://localhost:2368',
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
    env: {
      username: "",
      password: "",
    }
  }
})