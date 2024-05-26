import axios from 'axios';

const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
// const baseUrl = 'https://b7a3-181-143-211-148.ngrok-free.app';


const registerRequest = async (userData) =>{
    try {
        const response = await axios.post(`${baseUrl}user`, userData);
        return response.data;
    } catch (error) {
        console.error('Error: ', error.response.data.errors);
        throw error;
    }
}

const loginRequest = async (userData)=>{
    try {
        const response = await axios.post(`${baseUrl}login`, userData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const logoutRequest = async ()=>{
    axios.interceptors.request.use(
        (config) => {
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            return config;
        },
    
        (error) => {
            return Promise.reject(error);
        },
    );

    try {
        const response = await axios.post(`${baseUrl}logout`);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        return response.status;
    }catch(error){
        throw error;
    }
}

export {registerRequest, loginRequest, logoutRequest}
