import axios from './axios';

const baseURL = process.env.REACT_APP_API_URL;

const { token } = JSON.parse(localStorage.getItem("auth") || "{}") || false;
const config = { headers: { "Authorization": `Bearer ${ token }` } };

export { baseURL, config, axios };
