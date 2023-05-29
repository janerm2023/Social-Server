
const router = require("express").Router();
const { getUser } = require("../controllers/users");

// const bcrypt = require("bcrypt");

router.get('/:id',getUser)

// // Update user
// router.put("/:id", async (req, res) => {
//   // Correct
//   if (req.body.userId === req.params.id || req.body.isAdmin) {
//     // For password update
//     if (req.body.password) {
//       try {
//         const salt = await bcrypt.genSalt(10);
//         req.body.password = await bcrypt.hash(req.body.password, salt);
//       } catch (error) {
//         return res.status(400).json(error);
//       }
//     }

//     // For other content update
//     try {
//       await User.findByIdAndUpdate(req.params.id, { $set: req.body });
//       res.status(200).json("Account has been updated!");
//     } catch (error) {
//       res.status(400).json("");
//     }
//   }

//   // Incorrect
//   return res.status(403).json("You can only update your accouunt.");
// });

// // Delete user
// router.delete("/:id", async (req, res) => {
//   // Correct
//   if (req.body.userId === req.params.id || req.body.isAdmin) {
//     try {
//       //   await User.deleteOne({ _id: req.params.id });
//       await userModel.findByIdAndDelete(req.params.id);
//       res.status(200).json("Account has been deleted succefully!");
//     } catch (error) {
//       res.status(400).json("");
//     }
//   }

//   // Incorrect
//   return res.status(403).json("You can only delete your accouunt.");
// });

// // Get user
// router.get("/:id", async (req, res) => {
//   try {
//     const user = await userModel.findById(req.params.id);
//     !user && res.status(400).json("User not found");

//     // Password and UpdatedAt will be excluded
//     const { password, updatedAt, ...other } = user._doc;
//     return res.status(200).json(other);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

// // Follow a user
// router.put("/:id/follow", async (req, res) => {
//   if (req.body.userId !== req.params.id) {
//     try {
//       const user = await userModel.findById(req.params.id);
//       const currentUser = await userModel.findById(req.body.userId);

//       if (!user.followers.includes(req.body.userId)) {
//         await user.updateOne({ $push: { followers: req.body.userId } });
//         await currentUser.updateOne({ $push: { followings: req.params.id } });

//         res.status(200).json("User has been followed");
//       } else {
//         res.status(403).json("You are already a follower");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }

//   return res.status(403).json("You cannot follow yourself!");
// });

// // Unfollow user
// router.put("/:id/unfollow", async (req, res) => {
//   if (req.body.userId !== req.params.id) {
//     try {
//       const user = await userModel.findById(req.params.id);
//       const currentUser = await userModel.findById(req.body.userId);

//       if (user.followers.includes(req.body.userId)) {
//         await user.updateOne({
//           $pull: { followers: req.body.userId },
//         });

//         await currentUser.updateOne({
//           $pull: { followings: req.params.id },
//         });

//         res.status(200).json("User has been unfollowed");
//       } else {
//         res.status(403).json("You don't follow this user");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }

//   return res.status(403).json("You cannot unfollow yourself!");
// });

module.exports = router;
