import { createSlice } from '@reduxjs/toolkit';

const slice = {
  name: "user",
  initialState: { currentUser: {}, all: [] },
  reducers: {
    setCurrentUser: (state, { payload }) => { state.currentUser = payload },
    setUsers: (state, { payload }) => { state.all = payload },
    setUpdateUser: (state, { payload }) => { state.currentUser = payload }
  }
};

export const usersSlice = createSlice(slice);

export const { setCurrentUser, setUsers, setUpdateUser } = usersSlice.actions;
export default usersSlice.reducer;
