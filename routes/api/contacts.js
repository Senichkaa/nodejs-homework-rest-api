const express = require("express");
const router = express.Router();

const contacts = require("../../models/contacts");
const control = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

router.get("/", control.getAll);

router.get("/:contactId", isValidId, control.getContactById);

router.post("/", validateBody(contacts.addSchema), control.addContact);

router.delete("/:contactId", isValidId, control.removeContact);

router.put(
  "/:contactId",
  validateBody(contacts.addSchema),
  isValidId,
  control.updateById
);

router.patch(
  "/:contactId/favorite",
  validateBody(contacts.addSchema),
  isValidId,
  control.updateStatus
);

module.exports = router;
