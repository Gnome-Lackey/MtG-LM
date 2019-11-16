module.exports = {
  plugins: ["filenames", "@typescript-eslint"],
  extends: ["@bsokol/eslint-config/react-typescript"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/semi": "error",
    "react-hooks/exhaustive-deps": "off",
    "compat/compat": "off",
    "no-catch-shadow": "off"
  }
};
