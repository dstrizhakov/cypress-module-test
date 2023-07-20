import { defineConfig } from "cypress";

export default defineConfig({
  watchForFileChanges: false,
  defaultCommandTimeout: 20000,
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "config.json",
  },
  e2e: {
    baseUrl: "http://127.0.0.1:5500/dist/",
    downloadsFolder: "./dist/downloads/", //Path to folder where files downloaded during a test are saved.
    fileServerFolder: "./", //Path to folder where application files will attempt to be served from.
    fixturesFolder: "./dist/fixtures/", //Path to folder containing fixture files (Pass false to disable).
    screenshotsFolder: "./dist/screenshots/", //Path to folder where screenshots will be saved from cy.screenshot() command or after a test fails during cypress run.
    videosFolder: "./dist/videos/", //Path to folder where videos will be saved during cypress run
    videoCompression: 32, //The quality setting for the video compression, in Constant Rate Factor (CRF)
    specPattern: "./dist/tests/e2e/**/*.cy.{js,jsx,ts,tsx}", //A glob pattern String or Array of glob pattern Strings of the spec files to load.
    supportFile: false,
    video: true,
  },
});
