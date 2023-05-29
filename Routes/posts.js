const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { getPosts, addPost } = require("../controllers/posts");

// All Posts
router.get("/", getPosts);

// Create Post


router.post("/", upload.single("file"), addPost);

// // Create post
// router.post("/", async (req, res) => {
//   try {
//     const newPost = await postModel.create(req.body);
//     const savedPost = await newPost.save();

//     res.status(200).json(savedPost);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // update post
// router.put("/:id", async (req, res) => {
//   try {
//     const post = await postModel.findById(req.params.id);
//     if (post.userId === req.body.userId) {
//       await post.updateOne({ $set: req.body });

//       res.status(200).json("Post has been updated");
//     } else {
//       res.status(403).json("You can on update your post!");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // delete post
// router.delete("/:id", async (req, res) => {
//   try {
//     const post = await postModel.findById(req.params.id);

//     if (post.userId === req.body.userId) {
//       await post.deleteOne();
//       res.status(200).json("Post has been deleted");
//     } else {
//       res.status(403).json("You can on update your post!");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Like & Dislike a post
// router.put("/:id/like", async (req, res) => {
//   try {
//     const post = await postModel.findById(req.params.id);

//     if (!post.likes.includes(req.body.userId)) {
//       await post.updateOne({ $push: { likes: req.body.userId } });
//       res.status(200).json("Post has been liked");
//     } else {
//       await post.updateOne({ $pull: { likes: req.body.userId } });
//       res.status(200).json("Post has been disliked");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Get a post
// router.get("/:id", async (req, res) => {
//   try {
//     const post = await postModel.findById(req.params.id);
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Get timeline posts

// router.get("/timeline/:userId", async (req, res) => {
//   try {
//     const currentUser = await userModel.findById(req.params.userId);
//     const userPosts = await postModel.find({ userId: currentUser._id });
//     const friendPosts = await Promise.all(
//       currentUser.followings.map((friend) => {
//         return postModel.find({ userId: friend });
//       })
//     );

//     res.status(200).json(userPosts.concat(...friendPosts));
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
