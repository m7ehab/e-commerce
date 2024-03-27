const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "must be not null"],
      unique: true,
      minLength: 4,
      maxLength: 12,
    },
    name: {
      type: String,
      required: [true, "must be not null"],
      minLength: 4,
    },
    email: {
      type: String,
      required: [true, "must be not null"],
      validate: [validator.isEmail, "Please Add a valid email"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "must be not null"],
      select: false,
      minLength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, "must be not null"],
      validate: {
        validator: function (conf) {
          return conf === this.password;
        },
        message: "Passwords are not identical ",
      },
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.comparePassword = async function (
  password,
  candidatePassword
) {
  return await bcrypt.compare(password, candidatePassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordRestToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
