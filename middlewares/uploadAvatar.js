const multer = require("multer");
const AppError = require("../validation.helps/myError");
const { NOT_AUTHORIZED } = require("../constants/errorConstants");
const uuid = require("uuid").v4;

const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "tmp");
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    callback(null, `${req.user.id}-${uuid()}.${ext}`);
  },
  limits: {
    fileSize: 2 * 1024,
  },
});

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image/")) {
    callback(null, true);
  } else {
    callback(new AppError(401, NOT_AUTHORIZED), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = {
  upload,
};
