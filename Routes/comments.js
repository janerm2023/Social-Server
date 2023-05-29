const router = require("express").Router();
const { createComment, getComment } = require("../controllers/comments");

// Create new Comment
router.post("/", createComment);

// Get Comments
router.get("/:id", getComment);

module.exports = router;
