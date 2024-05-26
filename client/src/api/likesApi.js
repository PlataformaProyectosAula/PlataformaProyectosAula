// Dependencies
import axios from 'axios';

const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

axios.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
		return config;
	},

	(error) => {
		return Promise.reject(error);
	},
);

const giveLike = async (projectId) => {
	try {
		const reponse = await axios.get(`${baseUrl}like/${projectId}`, {
			headers: { 'ngrok-skip-browser-warning': true },
		});
		console.log(reponse);
	} catch (error) {
		throw error;
	}
};

const removeLike = async (projectId) => {
	try {
		const reponse = await axios.delete(`${baseUrl}like/${projectId}`, {
			headers: { 'ngrok-skip-browser-warning': true },
		});
		console.log(reponse);
	} catch (error) {
		throw error;
	}
};

export { giveLike, removeLike };
