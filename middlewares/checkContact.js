const MyModel = require("../models/contactSchema");
const { tryCatch } = require("../validation.helps/helpers");

const checkContact = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const userExist = await MyModel.findOne({ _id: id }).select("-__v");
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
};
