const express = require("express");
const router = express.Router();

const {
  getAllUser,
  getUserByID,
  postUser,
  updateContact,
  deleteUser,
  updateStatusContact,
} = require("../../controllers/contactsControllers");
const { checkContact } = require("../../middlewares/checkContact");
const { validContact } = require("../../middlewares/validContact");

router.get("/", getAllUser);

router.get("/:id", checkContact, getUserByID);

router.post("/", validContact, postUser);

router.put("/:id", checkContact, validContact, updateContact);

router.patch("/:id/favorite", checkContact, updateStatusContact);

router.delete("/:id", checkContact, deleteUser);

module.exports = router;

// router.route.get("/", getAllUser).post("/", postUser);
// router.use("/:id", checkContact);
// router.route("/:id").get(getUserByID).put(putUser).delete(deleteUser);
