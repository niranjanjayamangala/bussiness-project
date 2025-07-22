import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });

export const saveUser = (userData) => API.post('/auth/register', userData);
