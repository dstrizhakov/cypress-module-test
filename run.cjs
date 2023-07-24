console.clear();
const path = require("path");
const express = require("express");

const { dirname } = require("path");
const appDir = dirname(require.main.filename);
console.log("THIS AppDir: ", appDir.toUpperCase());

const child_process = require("child_process");
let _exec = child_process.exec;

// const CY_TEMPLATE = process.env.CY_TEMPLATE || "./dist"; // path to the template folder
// const CY_TEST_CASES = process.env.CY_TEST_CASES || "./dist"; // path to the test cases folder
// const CY_TEST_HOST = process.env.CY_TEST_HOST || "http://127.0.0.1:5500/dist"; // path to the test host wheare index.html hosted
// const CY_VIDEO_COMPRESSION = process.env.CY_VIDEO_COMPRESSION || -1; //-1 disabled by default, 0 best quality, min compression; 100 worst quality, max compression

function getPath(relPath) {
  return path.join(appDir, relPath);
}

const CY_TEMPLATE = getPath("dist"); // ** ТУТ ПЕРЕДАТЬ ОТНОСИТЕЛЬНЫЙ ПУТЬ К ПАПКЕ TEMPLATE  ** //
const CY_TEST_CASES = getPath("dist"); // ** ТУТ ПЕРЕДАТЬ ОТНОСИТЕЛЬНЫЙ ПУТЬ К ПАПКЕ TESTS  ** //
const CY_TEST_HOST = "http://127.0.0.1:5500/dist"; // ** ТУТ СТРОКА С АДРЕСОМ ХОСТА **//
const CY_VIDEO_COMPRESSION = 0;

console.log("ENV PARAMETERS: ", CY_TEMPLATE, CY_TEST_CASES, CY_TEST_HOST, CY_VIDEO_COMPRESSION);

_exec(
  `CY_TEMPLATE=${CY_TEMPLATE} CY_TEST_CASES=${CY_TEST_CASES} CY_TEST_HOST=${CY_TEST_HOST} CY_VIDEO_COMPRESSION=${CY_VIDEO_COMPRESSION} node index.cjs`,
  {
    // pwd: require('path').join(__dirname, 'cypress-module-test-main')
  },
  (...args) => {
    console.log("RECIVED ARGUMENTS: ", args);
  }
);

express().listen(14124);
