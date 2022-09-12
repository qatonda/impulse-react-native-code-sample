import Axios from 'axios';
import config from '../config';
import store from '../store';

const axios = Axios.create({
  baseURL: config.host,
});

axios.interceptors.request.use(axiosConfig => {
  const state = store.getState();
  const token = state.auth.token;

  const headers = axiosConfig.headers || {};
  if (token) {
    headers.authorization = token;
  } else {
    headers.authorization = '';
  }
  axiosConfig.headers = headers;

  return axiosConfig;
});

axios.interceptors.response.use(
  response => response,
  async error => Promise.reject(error?.response?.data?.error),
);

export default axios;
