const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userCommentId: {
      type: String,
      required: true,
    },

    postId: {
      type: String,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("Comment", CommentSchema);

module.exports = commentModel;
