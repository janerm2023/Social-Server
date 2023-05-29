const commentModel = require("../models/Comment");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const createComment = async (req, res) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged In!");

    const privateKey = fs.readFileSync(`${__dirname}/src/privateKey`, "utf8");

    const userInfo = await jwt.verify(token, privateKey);

    if (!userInfo) {
      return res.status(403).json("Token is not valid");
    }

    const newComment = await commentModel.create({
      userCommentId: userInfo.id,
      postId: req.body.postId,
      comment: req.body.comment,
    });

    await newComment.save();

    res.status(200).json("Comment has been created");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getComment = async (req, res) => {
  try {
    const comments = await commentModel.find({ postId: req.params.id });

    res.status(200).json(comments);
  } catch (error) {
    if (error) res.status(500).json(error);
  }
};

module.exports = { createComment, getComment };
