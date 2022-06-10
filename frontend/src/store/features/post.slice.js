import { createSlice } from '@reduxjs/toolkit';

const slice = {
  name: "post",
  initialState: { all: [] },
  reducers: {
    setPosts: (state, { payload }) => { state.all = payload },
    setCreatePost: (state, { payload }) => {
      const { UserId } = payload;
      delete payload.UserId;
      state.all = [ { userId: parseInt(UserId), ...payload }, ...state.all ];
    },
    setUpdatePost: (state, { payload }) => {
      state.all = state.all.map(post => {
        if (post.id === payload.postId) {
          console.log(payload)
          return { ...payload };
        }

        return post;
      });
    },
    setDeletePost: (state, { payload }) => { state.all = state.all.filter(post => post.id !== payload.postId) },
    setLikePost: (state, { payload }) => {
      state.all = state.all.map(post => {
        if (post.id === payload.postId) {
          return { ...post, Likes: [ payload, ...post.Likes ] };
        }

        return post;
      });
    },
    setDislikePost: (state, { payload }) => {
      state.all = state.all.map(post => {
        if (post.id === payload.postId) {
          return { ...post, Likes: post.Likes.filter(like => like.userId !== payload.userId) }
        }

        return post;
      });
    },
    setAddComment: (state, { payload }) => {
      state.all = state.all.map(post => {
        if (post.id === parseInt(payload.postId)) {
          return { ...post, Comments: [ payload, ...post.Comments ] };
        }

        return post;
      });
    },
    setUpdateComment: (state, { payload }) => {
      const { id, postId } = payload;
      state.all = state.all.map(post => {
        if (post.id === postId) {
          return { 
            ...post,
            Comments: post.Comments.map(comment => {
              if (comment.id === id) {
                return {
                  ...comment, comment: payload.comment
                };
              }
              return comment
            })
          };
        }
        return post;
      });
    },
    setDeleteComment: (state, { payload }) => {
      state.all = state.all.map(post => {
        if (post.id === payload.postId) {
          return { ...post, Comments: post.Comments.filter(comment => comment.id !== parseInt(payload.id)) };
        }

        return post;
      });
    }
  }
};

export const postSlice = createSlice(slice);

export const { setPosts, setCreatePost, setUpdatePost, setDeletePost, setLikePost, setDislikePost, setAddComment, setUpdateComment, setDeleteComment } = postSlice.actions;
export default postSlice.reducer;
