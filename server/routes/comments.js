const router = require('express').Router();
const { addComment, getComment, deleteComment } = require('../controller/comments')
const { verifyToken } = require('../verifyToken');

router.post("/", verifyToken, addComment);
router.get("/:videoId", getComment);
router.delete("/:videoId", verifyToken, deleteComment);

module.exports = router