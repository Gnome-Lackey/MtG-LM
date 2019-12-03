const { ENV } = process.env;

console.log("Environment set to: ", ENV);
console.log("Building application based on environment...")

let config;

if (ENV === "prod") {
  config = require("./webpack.config.prod");
} else if (ENV === "dev") {
  config = require("./webpack.config.dev");
} else {
  config = require("./webpack.config.local");
}

module.exports = config;
