const { Schema, model } = require("mongoose");

const mySchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  // не показывать поле прописать select:false
});

const MyModel = model("contacts", mySchema);

module.exports = MyModel;
