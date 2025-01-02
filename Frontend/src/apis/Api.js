import axios from 'axios';

// Creating an instance of axios
const Api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json', // Update this for JSON requests
    }
});

// Function to get authorization headers
const getAuthHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
});

// Creating test APIs
export const testApi = () => Api.get('/test');
export const newTestApi = () => Api.get('/new_test');

// User APIs
export const registerUserApi = (data) => Api.post('/api/user/create', data);
export const loginUserApi = (data) => Api.post('/api/user/login', data);
export const forgotPasswordApi = (data) => Api.post('/api/user/forgot_password', data);
export const verifyOtpApi = (data) => Api.post('/api/user/verify_otp', data);
export const getUserProfileApi = (userId) => Api.get(`/api/user/get_profile/${userId}`, getAuthHeaders());

// Product APIs
export const createProductApi = (data) => Api.post('/api/product/create', data, getAuthHeaders());
export const getAllProducts = () => Api.get('/api/product/get_all_products', getAuthHeaders());
export const getSingleProduct = (id) => Api.get(`/api/product/get_single_product/${id}`, getAuthHeaders());
export const deleteProduct = (id) => Api.delete(`/api/product/delete_product/${id}`, getAuthHeaders());
export const updateProduct = (id, data) => Api.put(`/api/product/update_product/${id}`, data, getAuthHeaders());
