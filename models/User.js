const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 4,
      max: 20,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      min: 4,
      max: 20,
    },

    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      min: 5,
    },

    profilePic: {
      type: String,
      default: "",
    },

    coverPic: {
      type: String,
      default: "",
    },

    followers: {
      type: Array,
      default: [],
    },

    followings: {
      type: Array,
      default: [],
    },

    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 30,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;
