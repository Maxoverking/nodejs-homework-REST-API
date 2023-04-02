const Jimp = require("jimp");
const fs = require("fs").promises;
const path = require("path");
const userModel = require("../../models/userSchema");

const fullPath = path.join(__dirname, "../../", "public", "avatars");

const changeAvatar = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { path: tmpFolder, filename } = req.file;

    const img = await Jimp.read(tmpFolder);
    await img
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(tmpFolder);

    const resultUpload = path.join(fullPath, filename);

    console.log("🚀  resultUpload:", resultUpload);
    await fs.rename(tmpFolder, resultUpload);

    const avatarURL = `/avatars/${filename}`;
    await userModel.findByIdAndUpdate(id, { avatarURL });

    res.status(200).json({
      id,
      avatarURL,
    });
  } catch (error) {}
};

module.exports = changeAvatar;
