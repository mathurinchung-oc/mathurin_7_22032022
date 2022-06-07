import { createSlice } from '@reduxjs/toolkit';

const slice = {
  name: "post",
  initialState: { all: [] },
  reducers: {
    setPosts: (state, { payload }) => { state.all = payload },
    setUpdatePost: (state, { payload }) => {
      return state.all.map((post) => {
        if (post.id === payload.postId) {
          return {
            ...post,
            content: payload.content,
          };
        } else return post;
      });
    },
    setDeletePost: (state, { payload }) => { state.all.filter((post) => post.id !== payload.postId) },
    setLikePost: (state, { payload }) => {
      return state.all.map(post => {
        if (post.id === payload.postId) {
          return {
            ...post,
            likes: [ payload.userId, ...post.likes ]
          };
        }

        return post;
      });
    },
    setDislikePost: (state, { payload }) => {
      return state.all.map((post) => {
        if (post.id === payload.postId) {
          return {
            ...post,
            likes: post.likes.filter(id => id !== payload.userId)
          };
        }

        return post;
      });
    },
  }
};

export const postSlice = createSlice(slice);

export const { setPosts, setLikePost, setDislikePost } = postSlice.actions;
export default postSlice.reducer;
