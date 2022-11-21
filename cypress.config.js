const { defineConfig } = require('cypress')
// --env ghostVersion=new
// --env baseUrl=http://localhost:2368
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
    env: {
      username: "jeimmy@gmail.com",
      password: "Colombia1234!",
    }
  }
}) 