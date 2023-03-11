const express = require("express");
const router = express.Router();
const { checkContact, validUser } = require("../../controllers/checkContacts");

const {
  getAllUser,
  getUserByID,
  postUser,
  putUser,
  deleteUser,
} = require("../../controllers/usersReqRes");

router.get("/", getAllUser);

router.get("/:contactId", checkContact, getUserByID);

router.post("/", validUser, postUser);

router.put("/:contactId", validUser, checkContact, putUser);

router.delete("/:contactId", checkContact, deleteUser);

module.exports = router;

// router.route.get("/", getAllUser).post("/", postUser);
// router.use("/:contactId", checkContact);
// router.route("/:contactId").get(getUserByID).put(putUser).delete(deleteUser);