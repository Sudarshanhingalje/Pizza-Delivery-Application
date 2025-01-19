import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:2000/api'});

export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const registerUser = (data) => API.post('/auth/register', data);
export const fetchPizzas = () => API.get('/pizzas');
const getOrders = () => {
    return axios.get(`${API_URL}/orders`);
};

export { getOrders };