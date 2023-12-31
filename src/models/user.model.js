import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    watchHistory: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Video",
        },
      ],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    avatar: { type: String, required: true },
    coverImage: String,
    refreshToken: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  console.log("hello world");
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// mongoose custom methods f
userSchema.methods.isPasswordCorrect = async (password) => {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id, username: this.username, email: this.email },
    process.env.ACCESS_TOKEN,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export const User = mongoose.model("User", userSchema);
