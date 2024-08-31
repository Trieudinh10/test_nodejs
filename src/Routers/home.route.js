const express = require("express");
const homeCtrl = require("../controllers/home.controller");
const authMiddleware = require("../middleware/auth.middleware");

module.exports = function (app) {
  const homeRouter = express.Router();

  // Apply middlewares
  homeRouter.use(authMiddleware);

  // Setup endpoints
  homeRouter.get("/", homeCtrl.home);

  // Bind to app
  app.use("/homepage", homeRouter);
};