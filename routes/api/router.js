const express = require("express");
const router = express.Router();
const { checkContact, validUser } = require("../../middleware/middleware");

const {
  getAllUser,
  getUserByID,
  postUser,
  updateContact,
  deleteUser,
  updateStatusContact,
} = require("../../controllers/controllers");

router.get("/", getAllUser);

router.get("/:contactId", checkContact, getUserByID);

router.post("/", validUser, postUser);

router.put("/:contactId", checkContact, validUser, updateContact);

router.patch("/:contactId/favorite", updateStatusContact);

router.delete("/:contactId", checkContact, deleteUser);

module.exports = router;

// router.route.get("/", getAllUser).post("/", postUser);
// router.use("/:contactId", checkContact);
// router.route("/:contactId").get(getUserByID).put(putUser).delete(deleteUser);
