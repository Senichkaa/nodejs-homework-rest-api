const express = require("express");
const router = express.Router();

const contacts = require("../../models/contacts");
const control = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

router.get("/", control.getAll);

router.get("/:contactId", authenticate, isValidId, control.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(contacts.addSchema),
  control.addContact
);

router.delete("/:contactId", authenticate, isValidId, control.removeContact);

router.put(
  "/:contactId",
  validateBody(contacts.addSchema),
  isValidId,
  control.updateById
);

router.patch(
  "/:contactId/favorite",
  validateBody(contacts.addSchema),
  authenticate,
  isValidId,
  control.updateStatus
);

module.exports = router;
