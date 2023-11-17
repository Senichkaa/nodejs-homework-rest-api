const { Contact } = require("../models/contacts");
const { httpError } = require("../helpers/HTTPError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw httpError(404, "Not Found!");
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404, "Not Found!");
  }
  res.json({
    message: "Contact deleted!",
  });
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404, "Not Found!");
  }
  res.json(result);
};

const updateStatus = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404, "Not Found!");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateById: ctrlWrapper(updateById),
  updateStatus: ctrlWrapper(updateStatus),
};
