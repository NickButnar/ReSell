import axios from 'axios';

export const API_URL = 'http://192.168.0.104:3000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

export default api
