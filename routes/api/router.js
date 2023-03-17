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

router.get("/:id", checkUser, getUserByID);

router.post("/", validUser, postUser);

router.put("/:id", checkUser, validUser, updateContact);

router.patch("/:id/favorite", checkUser, updateStatusContact);

router.delete("/:id", checkUser, deleteUser);

module.exports = router;

// router.route.get("/", getAllUser).post("/", postUser);
// router.use("/:id", checkUser);
// router.route("/:id").get(getUserByID).put(putUser).delete(deleteUser);
