import axios from 'axios';

const config = {
  baseURL: process.env.REACT_APP_API_URL + "/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true
};

export default axios.create(config);
