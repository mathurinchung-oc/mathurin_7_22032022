import { config, axios } from '../../api';
import { setPosts, setCreatePost, setDeletePost, setLikePost, setDislikePost, setUpdatePost } from '../features/post.slice';

const url = "/post";

const getAllPosts = () => {
  return async dispatch => {
    try {
      const response = await axios.get(url, config);
      return dispatch(setPosts(response.data));
    } catch (error) {
      console.error(error.message);
    }
  };
};

const createPost = (data) => {
  return async dispatch => {
    try {
      const response = await axios.post(url, data, config);
      return dispatch(setCreatePost(response.data.newPost));
    } catch (error) {
      console.error(error.message);
    }
  };
};

const updatePost = (postId, data) => {
  return async dispatch => {
    try {
      const response = await axios.put(`${ url }/${ postId }`, data, config);
      dispatch(setUpdatePost({ postId, ...response.data.postUpdated }));
    } catch (error) {
      console.error(error);
    }
  };
};

const deletePost = (postId) => {
  return async dispatch => {
    try {
      await axios.delete(`${url}/${postId}`, config);
      return dispatch(setDeletePost({ postId }));
    } catch (error) {
      console.error(error.message);
    }
  };
};

const likePost = (postId, userId) => {
//   return async dispatch => {
//     try {
//       await axios.post(`${url}/${postId}/like`, userId, config);
//       return dispatch(setLikePost({ payload: { postId, userId } }));
//     } catch (error) {
//       console.error(error.message);
//     }
//   };
};

const dislikePost = (postId, userId) => {
//   return async dispatch => {
//     try {
//       await axios.post(`${url}/${postId}/like`, userId, config);
//       return dispatch(setDislikePost({ payload: { postId, userId } }));
//     } catch (error) {
//       console.error(error.message);
//     }
//   };
};

const createComment = async (postId, data) => {
//   // return async dispatch => {
//     try {
//       await axios.post(`${url}/${postId}/comment`, data, config)
//       // return dispatch();
//     } catch (error) {
//       console.error(error.message);
//     }
//   // };
};

export { getAllPosts, createPost, updatePost, deletePost, likePost, dislikePost, createComment }
