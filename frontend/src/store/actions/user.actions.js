import { config, axios } from '../../api';
import { setCurrentUser, setUsers } from '../features/user.slice';

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
      await axios.put(`${ url }/${ userId }`, data, config);
      return dispatch(getOneUser(userId));
    } catch (error) {
      console.error(error.message);
    }
  }
};

const modifyEmail = () => {
  return async dispatch => {
    try {} catch (error) {}
  };
};

const modifyPassword = () => {
  return async dispatch => {
    try {} catch (error) {}
  };
};

const deleteUser = async (userId) => {
  // return async dispatch => {
    try {
      await axios.delete(`${url}/${userId}`, config);
      console.log("delete!!!");
    } catch (error) {
      console.error(error);
    }
  // };
};

export { getAllUsers, getOneUser, updateUser, modifyEmail, modifyPassword, deleteUser }
