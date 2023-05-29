const mongoose = require("mongoose");

const StoriesSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },

    userId: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const storiesModel = mongoose.model("Stories", StoriesSchema);

module.exports = storiesModel;
