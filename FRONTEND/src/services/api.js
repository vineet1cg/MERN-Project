import axios from 'axios';

const API_URL = import.meta.env.PROD ? import.meta.env.VITE_BACKEND_URL : '/api'; // Using Vite proxy in dev, direct URL in prod

const api = axios.create({
    baseURL: API_URL
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to catch 401 Unauthorized globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            // If the user is currently looking at the app but lost auth, redirect to login
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export const fetchPosts = async () => {
    try {
        const response = await api.get(`/posts`);
        return response.data.data.posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const createPost = async (formData) => {
    try {
        const response = await api.post(`/posts/create-post`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};
