const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const getAllData = await listContacts();
  res.status(200).json({
    message: getAllData,
    status: "success",
  });
});

router.get("/:contactId", async (req, res, next) => {
  const [getContactId] = await getContactById(req.params);
  if (getContactId) {
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
  // const { name, email, phone } = req.body;
  // const addNewContact = await addContact(name, email, phone);
  const addNewContact = await addContact(req.body);

  res.status(201).json({
    message: addNewContact,
    status: "success",
  });
});

router.put("/:contactId", async (req, res, next) => {
  const putUpdateContact = await updateContact(req.params, req.body);
  res.status(200).json({ message: putUpdateContact });
});

router.delete("/:contactId", async (req, res, next) => {
  const deleteContactById = await removeContact(req.params);
  if (deleteContactById) {
    return res.status(200).json({
      message: "contact deleted",
      status: "success",
    });
  }
  return res.status(404).json({
    message: "Not found",
    status: "error",
  });
});

module.exports = router;
