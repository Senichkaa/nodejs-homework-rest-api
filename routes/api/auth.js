const express = require("express");
const authRouter = express.Router();
const ctrl = require("../../controllers/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");
const {
  registerAndLoginSchema,
  userEmailSchema,
} = require("../../models/user");

authRouter.post(
  "/register",
  validateBody(registerAndLoginSchema),
  ctrl.register
);

authRouter.post("/login", validateBody(registerAndLoginSchema), ctrl.login);

authRouter.get("/current", authenticate, ctrl.getCurrent);
authRouter.post("/logout", authenticate, ctrl.logout);
authRouter.post("/verify", validateBody(userEmailSchema), ctrl.resendVerify);
authRouter.get("/verify/:verificationToken", ctrl.verify);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = authRouter;
