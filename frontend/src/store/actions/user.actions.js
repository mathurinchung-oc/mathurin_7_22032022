import { config, axios } from '../../api';
import { setUsers, setCurrentUser, setUpdateUser } from '../features/user.slice';

const url = "/user";

const getAllUsers = () => {
  return async dispatch => {
    try {
      const response = await axios.get(url, config);
      return dispatch(setUsers(response.data));
    } catch (error) {
      console.error(error.message);
    }
  };
};

const getOneUser = (userId) => {
  return async dispatch => {
    try {
      const response = await axios.get(`${ url }/${ userId }`, config);
      return dispatch(setCurrentUser(response.data));
    } catch (error) {
      console.error(error.message);
    }
  };
};

const updateUser = (userId, data) => {
  return async dispatch => {
    try {
      const response = await axios.put(`${ url }/${ userId }`, data, config);
      return dispatch(setUpdateUser({ ...response.data.userUpdated }));
    } catch (error) {
      console.error(error.message);
    }
  }
};

const modifyEmail = async (userId, data) => {
  try {
    await axios.put(`${ url }/${userId}/email`, data, config);
  } catch (error) {
    console.error(error.message);
  }
};

const modifyPassword = async (userId, data) => {
  try {
    const response = await axios.put(`${ url }/${userId}/password`, data, config);
    console.log( response);
  } catch (error) {
    console.error(error.message);
  }
};

export { getAllUsers, getOneUser, updateUser, modifyEmail, modifyPassword }
