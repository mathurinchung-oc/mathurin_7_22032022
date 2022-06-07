const express = require('express');
const router = express.Router();

const { auth, upload } = require('../middlewares');

const { getAllPosts, createPost, updatePost, deletePost, likePost } = require('../controllers/post.controller');

router.get('/', auth, getAllPosts);
router.post('/', auth, upload("posts"), createPost);
router.put('/:id', auth, upload("posts"), updatePost);
router.delete('/:id', auth, deletePost);

router.post('/:id/like', auth, likePost);

// const {  } = require('../controllers/comment.controller');
// router.get('/', );

module.exports = router;
