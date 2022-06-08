const { Post } = require('../models');

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