// Dependencies
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

const createProjectRequest = async (data) => {
	try {
		const response = await axios.post(`${baseUrl}post`, data, {
			headers: { 'ngrok-skip-browser-warning': true },
		});
		console.log(response);

		return response.data;
	} catch (error) {
		throw error;
	}
};
const getProjectRequest = async (projectId) => {
	try {
		const response = await axios.get(`${baseUrl}post/${projectId}`, {
			headers: { 'ngrok-skip-browser-warning': true },
			Accept: 'application/json',
		});
		return response;
	} catch (error) {
		throw error;
	}
};

const deleteProjectRequest = async (projectId) => {
	try {
		const response = await axios.delete(`${baseUrl}post/${projectId}`, {
			headers: { 'ngrok-skip-browser-warning': true },
		});
		return response;
	} catch (error) {
		throw error;
	}
};

const getTrendingProjectsRequest = async () => {
	try {
		const response = await axios.get(`${baseUrl}post/trending/likes`, {
			headers: { 'ngrok-skip-browser-warning': true },
		});
		return response.data.data;
	} catch (error) {
		throw error;
	}
};

const getProjectsForStudent = async () => {
	try {
		const response = await axios.get(`${baseUrl}post/relevant/students`, {
			headers: { 'ngrok-skip-browser-warning': true },
			Accept: 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		});
		if (response.status === 204) {
			return response.status;
		}
		return response.data.data;
	} catch (error) {
		throw error;
	}
};

const getAllProjectsRequest = async () => {
	try {
		const response = await axios.get(`${baseUrl}post/?page=1`, {
			headers: {
				'ngrok-skip-browser-warning': true,
				Accept: 'application/json',
			},
		});
		return response.data.data;
	} catch (error) {
		throw error;
	}
};

const getFile = async (fileLink) => {
	try {
		const response = await axios.get(fileLink, {
			headers: {
				'ngrok-skip-browser-warning': true,
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		const files = {
			cover: `${apiUrl}${response.data.data[0].links.file}`,
			file: `${apiUrl}${response.data.data[1].links.file}`,
		};
		return files;
	} catch (error) {
		throw error;
	}
};

const getProjectAuthor = async (url) => {
	try {
		const response = await axios.get(url, {
			headers: {
				'ngrok-skip-browser-warning': true,
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		const ownerData = {
			id: response.data.data.id,
			user_name: response.data.data.attributes.user_name,
			carrera: response.data.data.attributes.carrera,
			semestre: response.data.data.attributes.semestre,
		};
		return ownerData;
	} catch (error) {
		throw error;
	}
};

const filterProjects = async (condition) => {
	console.log(condition);
	if (condition !== '' || condition !== undefined) {
		try {
			const response = await axios.get(`${baseUrl}post/filter/${condition}`, {
				headers: {
					'ngrok-skip-browser-warning': true,
					Accept: 'application/json',
				},
			});
			console.log(response.data);
			if (response.status === 204) return 'NotFound';
			return response.data.data;
		} catch (error) {
			throw error;
		}
	}
};

export {
	createProjectRequest,
	getProjectRequest,
	deleteProjectRequest,
	getTrendingProjectsRequest,
	getProjectsForStudent,
	getAllProjectsRequest,
	getFile,
	getProjectAuthor,
	filterProjects,
};
