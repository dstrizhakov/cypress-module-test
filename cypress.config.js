const { defineConfig } = require("cypress");
const webpackConfig = require("./webpack.config");
const path = require("path");
const {
  CY_TEMPLATE,
  CY_TEST_CASES,
  CY_TEST_HOST,
  CY_VIDEO_COMPRESSION,
} = require("./index.cjs");

const isVideo = CY_VIDEO_COMPRESSION >= 0 && CY_VIDEO_COMPRESSION <= 100;
let videoQuality = 0;
if (isVideo) {
  videoQuality = Math.floor((CY_VIDEO_COMPRESSION * 51) / 100);
}

module.exports = defineConfig({
  watchForFileChanges: false,
  defaultCommandTimeout: 20000,
  reporter: "cypress-multi-reporters",

  reporterOptions: {
    configFile: "config.json",
  },

  e2e: {
    baseUrl: CY_TEST_HOST,
    //Path to folder where application files will attempt to be served from.
    fileServerFolder: CY_TEMPLATE, //"./dist/",

    //Path to folder where files downloaded during a test are saved.
    downloadsFolder: path.join(CY_TEMPLATE, "downloads"), //`./dist/downloads/`,

    //Path to folder containing fixture files (Pass false to disable).
    fixturesFolder: path.join(CY_TEMPLATE, "fixtures"), //"./dist/fixtures/",

    //Path to folder where screenshots will be saved from cy.screenshot() command or after a test fails during cypress run.
    screenshotsFolder: path.join(CY_TEMPLATE, "screenshots"), //"./dist/screenshots/",

    videosFolder: path.join(CY_TEMPLATE, "videos"), //"./dist/videos/",
    videoCompression: videoQuality,
    video: isVideo,

    //A glob pattern String or Array of glob pattern Strings of the spec files to load.
    specPattern: path.join(CY_TEST_CASES, "tests/e2e/**/*.cy.{js,jsx,ts,tsx}"), //"./dist/tests/e2e/**/*.cy.{js,jsx,ts,tsx}",

    // Path to file to load before spec files load. This file is compiled and bundled.
    supportFile: false,
  },
  component: {
    supportFolder: "./cypress/support",
    supportFile: "./cypress/support/commands.js",
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
      webpackConfig,
    },
    specPattern: "./component/**/*.spec.js",
  },
});
