import axios from "axios";

// export const URL = "https://web-production-168e.up.railway.app";
// export const FEUI = "https://aqua-fe.vercel.app";
export const URL = "http://localhost:5000";
export const FEUI = "http://localhost:5173";

export const fetchProducts = (payload) => axios.get(`${URL}/admin`);

export const createProducts = (payload) => {
  // console.log("payload : ", payload);
  return axios.post(`${URL}/products/createProduct`, payload);
};

export const updateProduct = (payload) => {
  return axios.put(`${URL}/products/${payload._id}`, payload);
};
export const deleteProducts = (payload) => {
  return axios.delete(`${URL}/products/${payload}`);
};

export const getAllUsers = (payload) => {
  return axios.get(`${URL}/users`);
};

export const updateUser = (payload) => {
  return axios.put(`${URL}/users/${payload._id}`, payload);
};
export const deleteUser = (payload) => {
  return axios.delete(`${URL}/users/${payload}`);
};

export const getChatUsers = (payload) => {
  return axios.get(`${URL}/users?id=${payload}`, payload);
};

export const logout = () => axios.get(`${URL}/auth/logout`);

export const fetchChat = (payload) => {
  return axios.get(`${URL}/chat?id=${payload}`, payload);
};
