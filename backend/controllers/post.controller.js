const fs = require('fs');
const { Post } = require('../models');

exports.getAllPosts = async (request, response) => {
  try {
    const posts = await Post.findAll({ attributes: [ 'id', 'userId', 'content', 'attachment', 'updatedAt' ], order: [ [ 'createdAt', 'DESC' ] ] });

    response.status(200).json(posts);
  } catch (error) {
    response.status(400).json({ error });
  }
};

exports.createPost = async (request, response) => {
  try {
    const postObject = request.file ? { ...request.body, attachment: `/${ request.file.path }` } : { ...request.body };
    
    const newPost = await Post.create({ ...postObject });

    response.status(201).json({ message: "post successfully created!", newPost });
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

    const postFound = await Post.findOne({ attributes: [ 'likes' ], where: { id: request.params.id } });
    if (!postFound) return response.status(404).json({ error: "post not found" });

    const likes = JSON.parse(postFound.likes);
    const isAlreadyLiked = likes.find(id => id === userId);
    
    if (!isAlreadyLiked) {
      likes.push(userId)
      await postFound.update({ likes: JSON.stringify(likes), id: request.params.id });
    }

    if (isAlreadyLiked) {
      likes.splice(likes.indexOf(isAlreadyLiked), 1);
      await postFound.update({ likes: JSON.stringify(likes), id: request.params.id });
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

exports.createComment = async (request, response) => {
  try {
    const comment = request.body;

    const postFound = await Post.findOne({ attributes: [ 'comments' ], where: { id: request.params.id } });
    if (!postFound) return response.status(404).json({ error: "post not found" });

    const comments = JSON.parse(postFound.comments);
    comments.push(comment);
    console.log(comments)

    await postFound.update({ comments: JSON.stringify(comments), id: request.params.id });

    response.status(201).json({ message: "comment successfully created!" });
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
