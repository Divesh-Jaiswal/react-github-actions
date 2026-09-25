import axios from 'axios';
import { User } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: BASE_URL,
});

export const userService = {
  getUsers: async () => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },
  createUser: async (user: Omit<User, 'id'>) => {
    const response = await api.post<User>('/users', user);
    return response.data;
  },
  updateUser: async (id: number, user: Partial<User>) => {
    const response = await api.put<User>(`/users/${id}`, user);
    return response.data;
  },
  deleteUser: async (id: number) => {
    await api.delete(`/users/${id}`);
    return id;
  },
};
