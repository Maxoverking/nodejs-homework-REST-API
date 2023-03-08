const express = require("express");
// const { nanoid } = require("nanoid");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  // updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const getAllData = await listContacts();
  res.status(200).json({
    message: getAllData,
    status: "success",
  });
});

router.get("/:contactId", async (req, res, next) => {
  const getContactId = await getContactById(req.params);
  if (getContactId.length === 1) {
    return res.status(200).json({
      message: getContactId,
      status: "success",
    });
  }
  return res.status(404).json({
    message: "Not found",
    status: "error",
  });
});

router.post("/", async (req, res, next) => {
  const addNewContact = await addContact(req.body);

  res.status(201).json({
    message: addNewContact,
    status: "success",
  });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template put message" });
});

router.delete("/:contactId", async (req, res, next) => {
  const deleteContactById = await removeContact(req.params);
  if (deleteContactById !== -1) {
    return res.status(200).json({
      message: "Contact deleted",
      status: "success",
    });
  }
  return res.status(404).json({
    message: "Not found",
    status: "error",
  });
});

module.exports = router;
