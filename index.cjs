const fs = require("fs");
const path = require("path");
const cypress = require("cypress");

const CY_TEMPLATE = process.env.CY_TEMPLATE || "./dist"; // path to the template folder

/** run cypress **/

setTimeout(() => {
  const options = {
    configFile: "cypress.config.js",
  };

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
