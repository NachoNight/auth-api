/*
  The exported function takes in the app itself as the argument 
  and applies all the listed middleware to it.
  Import and apply the middleware within the function
*/
const { json, urlencoded } = require("body-parser");
const logger = require("./logger");
const router = require("../router");

module.exports = app => {
  app.use(json());
  app.use(urlencoded({ extended: true }));
  logger(app);
  router(app);
};
