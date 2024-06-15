const developmentConfig = require("./webpack.config.dev.js");
const productionConfig = require("./webpack.config.prod.js");

module.exports = (env, { mode }) => {
  return mode === "development" ? developmentConfig : productionConfig;
};
