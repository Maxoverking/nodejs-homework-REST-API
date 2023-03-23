const express = require("express");
const { createUser } = require("../../controllers/userControllers");
const validUser = require("../../middlewares/validUser");
const router = express.Router();

router.post("/register", validUser, createUser);

module.exports = router;
