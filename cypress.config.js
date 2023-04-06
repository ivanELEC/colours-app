const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:  "http://localhost:3002",
    video: false,
    setupNodeEvents (on, _config) {
      on("task", {
        log (message) {
          console.log(message)
          return null
        },
        table (message) {
          console.table(message)
          return null
        }
      })
    }
  },
})
