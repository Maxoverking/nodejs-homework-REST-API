const { Schema, model } = require("mongoose");
const userSubscription = require("../constants/userSubscription");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: Object.values(userSubscription),
    default: userSubscription.STARTER,
  },
  token: {
    type: String,
    default: null,
  },
  // owner: {
  //   type: Schema.Types.ObjectId,
  //   ref: "user",
  // },
});

// console.log(userSchema.subscription.enum);

const userModel = model("user", userSchema);
module.exports = userModel;
