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

const getProfile = async (userId) => {
	try {
		const response = await axios.get(`${baseUrl}user/${userId}`, {
			headers: {
				'ngrok-skip-browser-warning': true,
				'Accept': 'application/json',
			},
		});
		const userData = {
			id: response.data.data.id,
			user_name: response.data.data.attributes.user_name,
			description: response.data.data.attributes.description,
			carrera: response.data.data.attributes.carrera,
			semestre: response.data.data.attributes.semestre,
		};
		console.log('freaking requests works');
		return userData;
	} catch (error) {
		throw error;
	}
};

const getMyProjects = async (userId) => {
	try {
		const response = await axios.get(`${baseUrl}post/user/posts/${userId}`, {
			headers: { 'ngrok-skip-browser-warning': true },
		});
		if (response.status === 204) {
			return response.status;
		}
		return response.data.data;
	} catch (error) {
		throw error;
	}
};

export { getProfile, getMyProjects };
