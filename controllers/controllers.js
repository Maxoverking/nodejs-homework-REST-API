const { tryCatch } = require("../validation.helps/helpers");
const MyModel = require("../models/userSchema");

const getAllUser = tryCatch(async (req, res) => {
  const data = await MyModel.find().select("-__v");

  res.status(200).json({
    message: data,
    status: "success",
  });
});

const getUserByID = (req, res) => {
  res.status(200).json({
    message: req.user,
    status: "success",
  });
};

const postUser = tryCatch(async (req, res) => {
  const newContact = await MyModel.create(req.body);
  res.status(201).json({
    message: newContact,
    status: "success",
  });
});

const updateContact = tryCatch(async (req, res) => {
  const { contactId } = req.params;
  const putContact = await MyModel.findByIdAndUpdate(
    { _id: contactId },
    req.body,
    { new: true }
  );

  res.status(200).json({
    message: putContact,
    status: "success",
  });
});

const updateStatusContact = tryCatch(async (req, res) => {
  const { contactId } = req.params;

  if (!Object.keys(req.body).includes("favorite")) {
    return res.status(400).json({
      message: "Missing field favorite",
      status: "error",
    });
  }
  const updateStatus = await MyModel.findOneAndUpdate(
    { _id: contactId },
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({
    message: updateStatus,
    status: "success",
  });
});

const deleteUser = tryCatch(async (req, res) => {
  await MyModel.deleteOne({ _id: req.user.id });

  return res.status(200).json({
    message: "contact deleted",
    status: "success",
  });
});

module.exports = {
  getAllUser,
  getUserByID,
  postUser,
  updateContact,
  deleteUser,
  updateStatusContact,
};
