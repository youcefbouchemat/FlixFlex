import axios from 'axios';
import {baseUrl} from '.';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export default axiosInstance;
