const express = require("express");
const router = express.Router();
const {
  checkUser,
  validUser,
} = require("../../controllers/middleware/middleware");

const {
  getAllUser,
  getUserByID,
  postUser,
  updateContact,
  deleteUser,
  updateStatusContact,
} = require("../../controllers/controllers");

router.get("/", getAllUser);

router.get("/:contactId", checkUser, getUserByID);

router.post("/", validUser, postUser);

router.put("/:contactId", checkUser, validUser, updateContact);

router.patch("/:contactId/favorite", updateStatusContact);

router.delete("/:contactId", checkUser, deleteUser);

module.exports = router;

// router.route.get("/", getAllUser).post("/", postUser);
// router.use("/:contactId", checkUser);
// router.route("/:contactId").get(getUserByID).put(putUser).delete(deleteUser);
