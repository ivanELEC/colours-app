const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:  process.env.ROOT_URL,
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
