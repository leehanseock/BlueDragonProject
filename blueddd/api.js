import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
});

export const fetchPosts = async (page = 1, perPage = 10) => {
    const response = await api.get(`/posts`, {
        params: { page, per_page: perPage },
    });
    return response.data;
};

export const fetchPostById = async (postId) => {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
};

export const createPost = async (postData) => {
    const response = await api.post(`/posts`, postData);
    return response.data;
};

export const updatePost = async (postId, postData) => {
    const response = await api.put(`/posts/${postId}`, postData);
    return response.data;
};

export const deletePost = async (postId) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
};
