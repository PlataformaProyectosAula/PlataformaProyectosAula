import axios from 'axios';

const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

axios.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
		return config;
	},

	(error) => {
		return Promise.reject(error);
	},
);

const getComments = async (projectId) => {
	try {
		const response = await axios.get(`${baseUrl}comment/${projectId}`, {
			headers: { 'ngrok-skip-browser-warning': true },
			Accept: 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		});
		return response.data.data;
	} catch (error) {
		throw error
	}
};

const createComment = async () => {
	try {
		const response = axios.post(`${baseUrl}comment/${projectId}`, {
			headers: { 'ngrok-skip-browser-warning': true },
			Accept: 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		});
		console.log((await response).status)
	} catch (error) {
		throw error
	}
};

export { getComments, createComment};
