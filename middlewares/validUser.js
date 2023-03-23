const AppError = require("../validation.helps/myError");
const { validationUser } = require("../validation.helps/validation");

const validUser = (req, res, next) => {
  const { error, value } = validationUser(req.body);
  if (error) {
    return next(new AppError(400, "Incorrect password or email"));
  }
  req = value;
  next();
};
module.exports = validUser;
