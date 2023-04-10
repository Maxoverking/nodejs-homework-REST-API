const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  patchSubscription,
} = require("../../controllers/userControllers");

const { verifyToken } = require("../../middlewares/verifyToken");
const validUser = require("../../middlewares/validUser");
const { upload } = require("../../middlewares/uploadAvatar");
const changeAvatar = require("../../controllers/changeAvatar/changeAvatarController");
const {
  verificationUserToken,
} = require("../../middlewares/verificationUserToken");
const { resendMail } = require("../../middlewares/resendMail");
// const { validResendMail } = require("../../validation.helps/validation");

const router = express.Router();

router.get("/verify/:verificationToken", verificationUserToken);
router.post("/verify", resendMail);
router.post("/register", validUser, registerUser);
router.post("/login", validUser, loginUser);
router.post("/logout", verifyToken, logoutUser);
router.post("/current", verifyToken, currentUser);
router.patch("/", verifyToken, patchSubscription);
router.patch("/avatars", verifyToken, upload.single("avatar"), changeAvatar);

module.exports = router;
