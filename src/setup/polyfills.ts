/**
 * This file runs before any other code within the project,
 * and polyfills the bundle to be compatible with older browsers.
 */

if (typeof Array.prototype.includes !== "function") {
  require("array-includes").shim();
}

// fetch() polyfill for making API calls.
if (typeof fetch !== "function") {
  require("whatwg-fetch");
}

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require("object-assign");

require("babel-polyfill");
