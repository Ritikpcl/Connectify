import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getUser = (userId) => API.get(`/user/${userId}`);
export const getSearchedUser = (query) => API.get(`/user/search/${query}`);
export const updateUser = (id, formData) =>  API.put(`/user/${id}`, formData);
export const getAllUser = ()=> API.get('/user')
export const followUser = (p_id,u_id)=> API.patch(`/user/follow/${p_id}`, {u_id : u_id})
export const unfollowUser = (p_id, u_id)=> API.patch(`/user/unfollow/${p_id}`, {u_id : u_id})