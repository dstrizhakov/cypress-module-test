const fs = require("fs");
const path = require("path");
const cypress = require("cypress");

const CY_TEMPLATE = process.env.CY_TEMPLATE || "./dist"; // path to the template folder

const CY_TEST_CASES = process.env.CY_TEST_CASES || "./dist"; // path to the test cases folder
const CY_TEST_HOST = process.env.CY_TEST_HOST || "http://127.0.0.1:5500/dist"; // path to the test host wheare index.html hosted
const CY_VIDEO_COMPRESSION = process.env.CY_VIDEO_COMPRESSION || -1; //-1 disabled by default, 0 best quality, min compression; 100 worst quality, max compression

module.exports = {
  CY_TEMPLATE,
  CY_TEST_CASES,
  CY_TEST_HOST,
  CY_VIDEO_COMPRESSION,
};

const options = {
  configFile: "cypress.config.js",
};

// console.log("RECIVED::", CY_TEST_CASES, CY_TEST_HOST, CY_VIDEO_COMPRESSION);
/** run cypress **/

setTimeout(() => {
  // cypress
  //   .run(options)
  //   .then((results) => {
  //     console.log(results);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     process.exit(1);
  //   });

  cypress
    .run(options)
    .then((results) => {
      console.log(results);

      let data = JSON.stringify(results);
      const pathToTestResult = path.join(CY_TEMPLATE, "cy-data-test.json");
      fs.writeFileSync(pathToTestResult, data);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}, 100);
