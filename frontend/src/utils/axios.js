import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY' : process.env.REACT_APP_KEY
  },
});


const get = async (url, config = {}) => {
  try {
    const response = await axiosInstance.get(url, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};


const post = async (url, data, config = {}) => {
  try {
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};


const put = async (url, data, config = {}) => {
  try {
    const response = await axiosInstance.put(url, data, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};


const del = async (url, config = {}) => {
  try {
    const response = await axiosInstance.delete(url, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};


const handleError = (error) => {
  if (error.response) {
    console.error('Server responded with error:', error.response.data);
  } else if (error.request) {
    console.error('No response from server:', error.request);
  } else {
    console.error('Error setting up request:', error.message);
  }
  return { error: true, message: error.message };
};

export default {
  get,
  post,
  put,
  delete: del,
};
