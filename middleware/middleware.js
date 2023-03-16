const MyModel = require("../controllers/userSchema/userSchema");
const { validationUser } = require("../models/validation");
const { tryCatch } = require("../models/helpers");

const validUser = (req, res, next) => {
  const { error, value } = validationUser(req.body);

  if (error) {
    return res.status(404).json({
      message: error.message,
      status: "error",
    });
  }
  const { name, email, phone } = value;

  if (!name || !email || !phone) {
    res.status(400).json({
      message: "missing required name field",
      status: "error",
    });
    return;
  }
  req = value;
  next();
};

const checkContact = tryCatch(async (req, res, next) => {
  const { contactId } = req.params;
  const userExist = await MyModel.findOne({ _id: contactId }).select("-__v");
  if (!userExist) {
    return res.status(404).json({
      message: "Not found",
      status: "error",
    });
  }

  req.user = userExist;
  next();
});

module.exports = {
  checkContact,
  validUser,
};
