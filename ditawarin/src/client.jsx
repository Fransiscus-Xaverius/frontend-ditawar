import axios from 'axios';
require('dotenv').config();

const client = axios.create({
    baseURL: process.env.API_URL,
});

export default client;