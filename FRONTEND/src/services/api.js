import axios from 'axios';

const API_URL = '/api'; // Using Vite proxy

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
