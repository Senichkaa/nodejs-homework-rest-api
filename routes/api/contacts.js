const express = require("express");
const contacts = require("../../models/contacts");
const Joi = require("joi");
const { HTTPError } = require("../../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      HTTPError(400, "Not Found!");
    }
    res.json(result);
  } catch (error) {}
});

router.post("/", async (req, res, next) => {
  try {
    const error = addSchema.validate(req.body);
    if (error) {
      throw HTTPError(400, "Missing required name field!");
    }
    const result = await contacts.addContact(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HTTPError(404, "Not Found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HTTPError(400, "Missing fields!");
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HTTPError(404, "Not Found!");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
