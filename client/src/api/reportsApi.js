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

const createReport = async (data) => {
	data = {
		attributes: {
			title: data.title,
			description: data.description,
			file: data.file,
		},
	};
	try {
		const response = await axios.post(`${baseUrl}report`, data, {
			headers: {
				'ngrok-skip-browser-warning': true,
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		return response;
	} catch (error) {
		throw error.message;
	}
};

const getReports = async () => {
	try {
		const response = await axios.get(`${baseUrl}report`, {
			headers: {
				'ngrok-skip-browser-warning': true,
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
        console.log(`${baseUrl}report`);
        return response.data.data;
	} catch (error) {
		throw error;
	}
};

const getReportFile = async (fileLink) => {
	console.log('link: ', fileLink);
	try {
		const response = await axios.get(fileLink, {
			headers: {
				'ngrok-skip-browser-warning': true,
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		const file = `${apiUrl}${response.data.data.links.file}`;
		console.log(file);
		return file;
	} catch (error) {
		throw error;
	}
}

export { createReport, getReports, getReportFile};
