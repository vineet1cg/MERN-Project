import axios from 'axios';

const API_URL = import.meta.env.PROD ? 'https://mern-project-fdh9.onrender.com' : '/api'; // Using Vite proxy in dev, direct URL in prod

export const fetchPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        return response.data.posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const createPost = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/create-post`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.post;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};
