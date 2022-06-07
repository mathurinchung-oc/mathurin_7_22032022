import { config, axios } from '../../api';
import { setPosts, setLikePost, setDislikePost } from '../features/post.slice';

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

const createPost = async (data) => {
  // return async dispatch => {
    try {
      await axios.post(url, data, config)
      // return dispatch();
    } catch (error) {
      console.error(error.message);
    }
  // };
};

const updatePost = async (postId, data) => {
  // return async dispatch => {
    try {
      console.log(data)
      await axios.put(`${ url }/${ postId }`, data, config)
    } catch (error) {
      console.error(error);
    }
  // };
};

const deletePost = async (postId) => {
  // return async dispatch => {
    try {
      await axios.delete(`${url}/${postId}`, config);
    } catch (error) {
      console.error(error.message);
    }
  // };
};

const likePost = (postId, data) => {
  return async dispatch => {
    try {
      await axios.post(`${url}/${postId}/like`, { userId: data }, config);
      return dispatch(setLikePost({ payload: { postId, userId: data } }));
    } catch (error) {
      console.error(error.message);
    }
  };
};

const dislikePost = (postId, data) => {
  return async dispatch => {
    try {
      await axios.post(`${url}/${postId}/like`, { userId: data }, config);
      return dispatch(setDislikePost({ payload: { postId, userId: data } }));
    } catch (error) {
      console.error(error.message);
    }
  };
};

export { getAllPosts, createPost, updatePost, deletePost, likePost, dislikePost }
