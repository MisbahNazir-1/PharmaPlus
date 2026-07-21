import axios from 'axios';

const API = axios.create({
    baseURL: 'https://pharma-plus-six.vercel.app/api', 
});

export default API;