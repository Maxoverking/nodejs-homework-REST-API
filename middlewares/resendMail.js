const { INCORRECT_PASWRD_EMAIL } = require("../constants/errorConstants");
const userModel = require("../models/userSchema");
const AppError = require("../validation.helps/myError");
const { sendEmail } = require("../validation.helps/sendEmailVerifycationToken");
const { validResendMail } = require("../validation.helps/validation");

const resendMail = async (req, res, next) => {
  const { error } = validResendMail(req.body);

  if (error) return next(new AppError(400, INCORRECT_PASWRD_EMAIL));

  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) return next(new AppError(401, "User not found"));
  if (user.verify) return next(new AppError(401, "User already verified"));

  await sendEmail(email, user.verificationToken);

  res.status(200).json({
    message: "Verification email sent",
    status: "success",
  });
};
module.exports = {
  resendMail,
};
