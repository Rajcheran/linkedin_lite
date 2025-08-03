import axios from 'axios';
import { AuthResponse, LoginCredentials, RegisterCredentials, Post, User, Comment } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', credentials);
    return response.data;
  },

  getCurrentUser: async (): Promise<{ user: User }> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const postsAPI = {
  getPosts: async (): Promise<Post[]> => {
    const response = await api.get('/posts');
    return response.data;
  },

  createPost: async (content: string): Promise<Post> => {
    const response = await api.post('/posts', { content });
    return response.data;
  },

  getPost: async (id: string): Promise<Post> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  deletePost: async (id: string): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },

  likePost: async (id: string): Promise<{ likes: number; isLiked: boolean }> => {
    const response = await api.put(`/posts/${id}/like`);
    return response.data;
  },

  addComment: async (postId: string, text: string): Promise<Comment[]> => {
    const response = await api.post(`/posts/${postId}/comment`, { text });
    return response.data;
  },
};

export const usersAPI = {
  getUser: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  getUserPosts: async (id: string): Promise<Post[]> => {
    const response = await api.get(`/users/${id}/posts`);
    return response.data;
  },

  updateProfile: async (name: string, bio: string): Promise<User> => {
    const response = await api.put('/users/profile', { name, bio });
    return response.data;
  },

  searchUsers: async (search?: string): Promise<User[]> => {
    const response = await api.get('/users', { params: { search } });
    return response.data;
  },
};

export default api;