const fs = require('fs');
const { Post, User, Like, Comment } = require('../models');

exports.getAllPosts = async (request, response) => {
  try {
    const posts = await Post.findAll({
      attributes: [ 'id', 'userId', 'content', 'attachment', 'updatedAt' ],
      include: [
        { model: User, attributes: [ 'id', 'fullname', 'avatar' ] },
        { model: Like, attributes: [ 'userId', 'postId' ] },
        { model: Comment, attributes: [ 'userId', 'postId', 'comment' ] },
      ],
      order: [ [ 'updatedAt', 'DESC' ] ]
    });

    response.status(200).json(posts);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

exports.createPost = async (request, response) => {
  try {
    const postObject = request.file ? { ...request.body, attachment: `/${ request.file.path }` } : { ...request.body };

    const newPost = await Post.create({ ...postObject });
    console.log(newPost.id)

    const post = await Post.findOne({
      attributes: [ 'id', 'userId', 'content', 'attachment', 'updatedAt' ],
      include: [
        { model: User, attributes: [ 'id', 'fullname', 'avatar' ] },
        { model: Like, attributes: [ 'userId', 'postId' ] },
        { model: Comment, attributes: [ 'userId', 'postId', 'comment' ] },
      ],
      where: { id: newPost.id }
    });

    response.status(201).json({ message: "post successfully created!", post });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

exports.updatePost = async (request, response) => {
  try {
    const postObject = request.file ? { ...request.body, attachment: `/${request.file.path}` } : { ...request.body };

    const postFound = await Post.findOne({ attributes: [ 'content', 'attachment' ], where: { id: request.params.id } });
    if (!postFound) return response.status(404).json({ error: "post not found" });

    const postUpdated = await postFound.update({ ...postObject, id: request.params.id });

    response.status(200).json({ message: "post successfully updated!", postUpdated });
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
};

exports.deletePost = async (request, response) => {
  try {
    const postFound = await Post.findOne({ where: { id: request.params.id } });
    if (!postFound) return response.status(404).json({ error: "post not found" });

    if (postFound.attachment) {
      const filename = postFound.attachment.split('images/posts')[1];
      fs.unlink(`images/posts/${filename}`, async () => {
        try {
          await Post.destroy({ where: { id: request.params.id } });
    
          response.status(200).json({ message: "post has been deleted" });
        } catch (error) {
          response.status(400).json({ error: error.message });
        }
      });
    } else {
      try {
        await Post.destroy({ where: { id: request.params.id } });
  
        response.status(200).json({ message: "post has been deleted" });
      } catch (error) {
        response.status(400).json({ error: error.message });
      }
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

exports.likePost = async (request, response) => {
  try {
    const { userId } = request.body;
    const postId = request.params.id;

    const isAlreadyLiked = await Like.findOne({ where: { userId, postId } })

    if (!isAlreadyLiked) {
      await Like.create({ userId, postId });
      response.status(201).json({ message: "liked!!!", like: { postId, userId } });
    }

    if (isAlreadyLiked) {
      await Like.destroy({ where: { userId, postId } }, { truncate: true, restartIdentity: true });
      response.status(200).json({ message: "disliked!!!", dislike: { postId, userId } });
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

exports.createComment = async (request, response) => {
  try {
    const { userId, comment } = request.body;

    const postFound = await Post.findOne({ where: { id: request.params.id } });
    if (!postFound) return response.status(404).json({ error: "post not found" });

    // await postFound.update({ comments: JSON.stringify(comments), id: request.params.id });

    const postId = postFound.id;
    const newComment = await Comment.create({ userId, postId, comment })

    response.status(201).json({ message: "comment successfully created!", newComment });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

exports.deleteComment = async (request, response) => {
  // try {
  //   const postFound = await Post.findOne({ where: { id: request.params.id } });
  //   if (!postFound) return response.status(404).json({ error: "post not found" });

  //   if (postFound.attachment) {
  //     const filename = postFound.attachment.split('images/posts')[1];
  //     fs.unlink(`images/posts/${filename}`, async () => {
  //       try {
  //         await Post.destroy({ where: { id: request.params.id } });
    
  //         response.status(200).json({ message: "post has been deleted" });
  //       } catch (error) {
  //         response.status(400).json({ error: error.message });
  //       }
  //     });
  //   } else {
  //     try {
  //       await Post.destroy({ where: { id: request.params.id } });
  
  //       response.status(200).json({ message: "post has been deleted" });
  //     } catch (error) {
  //       response.status(400).json({ error: error.message });
  //     }
  //   }
  // } catch (error) {
  //   response.status(400).json({ error: error.message });
  // }
};
