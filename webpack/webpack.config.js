const { ENV } = process.env;

const environment = ENV || "local";

console.log("Environment set to:", environment);

let config;

if (environment === "prod") {
  console.log('Production environment detected. Using "prod" configuration...');
  config = require("./webpack.config.prod");
} else if (environment === "qa") {
  console.log('Development environment detected. Using "qa" configuration...');
  config = require("./webpack.config.qa");
} else if (environment === "dev") {
  console.log('Development environment detected. Using "dev" configuration...');
  config = require("./webpack.config.dev");
} else {
  console.log('Local environment detected. Using "local" configuration...');
  config = require("./webpack.config.local");
}

module.exports = config;
