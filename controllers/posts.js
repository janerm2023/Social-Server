const postModel = require("../models/Post");
const userModel = require("../models/User");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const getPosts = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    
    if (!token) return res.status(401).json("Not logged In!");

    const privateKey = fs.readFileSync(`${__dirname}/src/privateKey`, "utf8");

    const userInfo = await jwt.verify(token, privateKey);

    if (!userInfo) {
      return res.status(403).json("Token is not valid");
    }

    const user = await userModel.findOne({ _id: userInfo.id });

    const userPost = await postModel.find({ userId: userInfo.id });

    const friendsPosts = await Promise.all(
      user.followers.map(async (friend) => {
        return await postModel.find({ userId: friend });
      })
    );

    const posts = userPost.concat(...friendsPosts);

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// CREATE POST
const addPost = async (req, res) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged In!");

    const privateKey = fs.readFileSync(`${__dirname}/src/privateKey`, "utf8");

    const userInfo = await jwt.verify(token, privateKey);

    if (!userInfo) {
      return res.status(403).json("Token is not valid");
    }

    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];

    const newPath = path + "." + ext;

    fs.renameSync(path, newPath);

    const newPosts = await postModel.create({
      userId: userInfo.id,
      desc: req.body.desc,
      postImg: newPath,
    });

    await newPosts.save();

    res.status(200).json("Post has been created!");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getPosts, addPost };
