import express from "express";
import contacts from "../../models/contacts.js";


const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  res.json(result);
});

router.post("/", async (req, res, next) => {
  const result = await contacts.addContact(req.body);
  return res.status(201).json(result, "user added");
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  res.status(200).json(result, "user deleted");
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  res.json(result);
});

module.exports = router;
