import axios from 'axios';

const api = axios.create({
    baseURL: 'http://175.106.99.242:5001/api',
    withCredentials: true,
});
//'http://192.168.24.158:5000/api'에서 바꿈 서버연동을 위해 http://175.106.99.242:3390

export default api;



// 특정 카테고리의 게시물 반환
export const fetchPostsByCategory = async (categoryName, page = 1, perPage = 10) => {
    try {
        const response = await api.get(`/posts/category/${categoryName}`, {
            params: { page, per_page: perPage }, // 쿼리 파라미터로 페이지 번호와 항목 수 전달
        });
        return response.data; // API에서 반환한 데이터를 그대로 반환
    } catch (error) {
        console.error(`Error fetching posts by category: ${error}`);
        throw error; // 에러를 호출한 쪽에서 처리하도록 전달
    }
};

// 게시물 검색 또는 전체 게시물 조회
export const fetchOrSearchPosts = async (query, scope) => {
    try {
        const response = await api.get('/search/posts/', {
            params: {
                query: query, // 검색어
                scope: scope, // 검색 범위 ('title', 'content', 'title_content', 'author')
            },
        });

        return response.data; // API에서 반환된 게시물 데이터
    } catch (error) {
        console.error(`Error fetching or searching posts: ${error}`);
        throw error; // 에러를 호출한 쪽에서 처리하도록 전달
    }
};

//포스트 반환
export const fetchPosts = async (page = 1, perPage = 10) => {
    const response = await api.get(`/posts`, {
        params: { page, per_page: perPage },
    });
    return response.data;
};

//id 반환
export const fetchPostById = async (postId) => {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
};

// 게시글 작성
export const createPost = async (postData) => {
    const response = await api.post(`/posts`, postData);
    return response.data;
};

// 게시글 수정
export const updatePost = async (postId, postData) => {
    const response = await api.put(`/posts/${postId}`, postData);
    return response.data;
};

//  게시글 삭제
export const deletePost = async (postId) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
};

// 회원가입 함수
export const register = async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
};

// login 함수 추가
export const login = async (email, password) => {
    const response = await api.post('/login', { email, password });
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

