const fs = require("fs");
const path = require("path");
const cypress = require('cypress');

const CY_TEMPLATE_FOLDER = process.env.CY_TEMPLATE_FOLDER || './_mock/template';
const CY_TEST_CASES_FOLDER = process.env.CY_TEST_CASES_FOLDER || '_mock/tests';
const CY_RESULTS_FILE = process.env.CY_RESULTS_FILE || 'cy-results.json';

/** copy template and test folders to cypress **/

// copyTestData(CY_TEMPLATE_FOLDER, CY_TEST_CASES_FOLDER); 

// function copyFolders(fromPath, toPath) {
//   fs.readdir(fromPath, { withFileTypes: true }, (error, items) => {
//     for (let i = 0; i < items.length; i++) {
//       if (items[i].isDirectory()) {
//         fs.mkdir(
//           path.join(toPath, items[i].name),
//           { recursive: true },
//           (error) => {
//             if (error) {
//               throw Error(error);
//             }
//           }
//         );
//         copyFolders(
//           path.join(fromPath, items[i].name),
//           path.join(toPath, items[i].name),
//           toPath + "/" + items[i].name
//         );
//       } else {
//         fs.copyFile(
//           path.join(fromPath, items[i].name),
//           path.join(toPath, items[i].name),
//           (error) => {
//             if (error) {
//               throw Error(error);
//             }
//           }
//         );
//       }
//     }
//   });
// }

// function copyTestData (template, tests) { 
// const distFolder = path.join(__dirname, "dist");
// fs.promises
//   .rm(distFolder, {
//     recursive: true,
//     force: true,
//   })
//   .finally(function () {
//     fs.promises
//       .mkdir(distFolder, {
//         recursive: true,
//       })
//       .then(() => {
//         copyFolders(template, distFolder);
//       });
//   });

// // Copy test cases folder from CY_TEMPLATE_FOLDER to cypress/e2e //
// const testsFolder = path.join(__dirname, "cypress/e2e");
// fs.promises
//   .rm(testsFolder, {
//     recursive: true,
//     force: true,
//   })
//   .finally(function () {
//     fs.promises
//       .mkdir(testsFolder , {
//         recursive: true,
//       })
//       .then(() => {
//         copyFolders(tests, testsFolder );
//       });
//   });
// }

/** start the server **/

// createServer(cypressConfig, path.join(__dirname, "dist"), 8080)

/** run cypress **/

setTimeout(()=>{
const options = {
  configFile: 'cypress.config.js',
};

cypress.run(options)
  .then((results) => {
    console.log(results);
  
    let data = JSON.stringify(results);
    fs.writeFileSync('./dist/cy-data-test.json', data);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

}, 2000)

