// Dependencies
import axios from 'axios';

const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
// const baseUrl = 'https://9360-181-143-211-148.ngrok-free.app';


axios.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
		return config;
	},

	(error) => {
		return Promise.reject(error);
	},
);

const getCareerProjectsRequest = async (career) => {
	console.log('Career in request', career)
	try {
		const response = await axios.get(
			`${baseUrl}post?filter[career]=${career}`,
			{ headers: { 'ngrok-skip-browser-warning': true } },
		);
		console.log(response.data.data)
		return response.data.data;
	} catch (error) {
		throw error;
	}
};

export { getCareerProjectsRequest };
