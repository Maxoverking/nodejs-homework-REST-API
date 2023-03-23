const bcrypt = require("bcrypt");
const userModel = require("../models/userSchema");
const { tryCatch } = require("../validation.helps/helpers");

const createUser = tryCatch(async (req, res, next) => {
  const { password, ...restData } = req.body;

  console.log("🚀  password:", password);

  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await userModel.create({
    ...restData,
    password: hashedPassword,
  });
  newUser.password = undefined;
  res.status(201).json({
    message: newUser,
    status: "success",
  });
});

module.exports = {
  createUser,
};
