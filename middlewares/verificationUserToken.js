const { USER_NOT_FOUND } = require("../constants/errorConstants");
const userModel = require("../models/userSchema");
const AppError = require("../validation.helps/myError");

const verificationUserToken = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await userModel.findOneAndUpdate(
    { verificationToken },
    { verificationToken: null, verify: true },
    { new: true }
  );

  if (!user) return next(new AppError(404, USER_NOT_FOUND));

  res.status(200).json({
    message: "Verification successful",
    status: "success",
  });
};
module.exports = {
  verificationUserToken,
};
