const router = require("express").Router();
const { likePost } = require("../controllers/likes");

// Post new likes
router.post("/like", likePost);


module.exports = router;
