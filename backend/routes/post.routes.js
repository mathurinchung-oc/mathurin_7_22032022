const express = require('express');
const router = express.Router();

const { auth, upload } = require('../middlewares');

const { getAllPosts, createPost, updatePost, deleteAttachment, deletePost, likePost, createComment, updateComment, deleteComment } = require('../controllers/post.controller');

router.get('/', auth, getAllPosts);
router.post('/', auth, upload("posts"), createPost);
router.put('/:id', auth, upload("posts"), updatePost);
router.delete('/:id/upload', auth, deleteAttachment);
router.delete('/:id', auth, deletePost);

router.post('/:id/like', auth, likePost);

router.post('/:id/comment', auth, createComment);
router.put('/comment/:id', auth, updateComment);
router.delete('/comment/:id', auth, deleteComment);

module.exports = router;
