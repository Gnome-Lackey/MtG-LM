const { ENV } = process.env;

console.log("Environment set to:", ENV);

let config;

if (ENV === "prod") {
  console.log('Production environment detected. Using "prod" configuration...');
  config = require("./webpack.config.prod");
} else if (ENV === "qa") {
  console.log('Development environment detected. Using "qa" configuration...');
  config = require("./webpack.config.qa");
} else if (ENV === "dev") {
  console.log('Development environment detected. Using "dev" configuration...');
  config = require("./webpack.config.dev");
} else {
  console.log('Local environment detected. Using "local" configuration...');
  config = require("./webpack.config.local");
}

module.exports = config;
