const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: Schema.Types.ObjectId,
    ref: "secretStr",
  },
  password: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = User = mongoose.model("users", UserSchema);
