const express = require("express");
const authRouter = express.Router();
const ctrl = require("../../controllers/auth");
const { validateBody, authenticate } = require("../../middlewares");
const { registerAndLoginSchema } = require("../../models/user");

authRouter.post(
  "/register",
  validateBody(registerAndLoginSchema),
  ctrl.register
);

authRouter.post("/login", validateBody(registerAndLoginSchema), ctrl.login);

authRouter.get("/current", authenticate, ctrl.getCurrent);
authRouter.post("/logout", authenticate, ctrl.logout);

module.exports = authRouter;
