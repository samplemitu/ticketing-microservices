import axios, { AxiosInstance } from 'axios';

const client: AxiosInstance = axios.create({
  baseURL: '/',
  withCredentials: true, // 👈 Default enabled everywhere
});

export default client;
