import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.24.158:5000', //'http://192.168.24.158:5000/api'에서 바꿈 서버연동을 위해
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

// 인증 토큰 처리를 위한 API 요청 인터셉터 설정
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            // 인증 에러 처리
            localStorage.removeItem('token');
            // 로그인 페이지로 리다이렉트 등의 처리
        }
        return Promise.reject(error);
    }
);
export default api;
