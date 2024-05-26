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

const getUsers = async (page) => {
	try {
		const response = await axios.get(`${baseUrl}user${page}&perPage=4`, {
			headers: {
				'ngrok-skip-browser-warning': true,
				'Content-Type': 'application/json',
			},
		});
		if (response.status === 204) return 204;
		const users = Array.isArray(response.data.data)
			? response.data.data
			: Object.values(response.data.data);
		const data = { data: users, pages: response.data.links };
		return data;
	} catch (error) {
		console.error('Ha ocurrido un error', error);
	}
};

const filterUsers = async (condition, page) => {
	page = page.substring(1);
	console.log('fiter refrence page; ', page);
	const { input, userState, role } = condition;
	const state = userState === '*' ? '' : userState;
	const userRole = role === '*' ? '' : role;
	if (condition !== null) {
		if (userState !== '' && role === '' && input === '') {
			console.log('primera:', `${baseUrl}user${page}&perPage=4&filter[state]=${state}`);
			try {
				const response = await axios.get(
					`${baseUrl}user${page}&perPage=4&filter[state]=${state}`,
					{
						headers: { 'ngrok-skip-browser-warning': true },
					},
				);
				if (response.status === 204) return 204;
				const users = Array.isArray(response.data.data)
					? response.data.data
					: Object.values(response.data.data);
				const data = { data: users, pages: response.data.links };
				return data;
			} catch (error) {
				console.error(error);
			}
		} else if (role !== '' && userState === '' && input === '') {
			console.log('segunda: ', `${baseUrl}user${page}&perPage=4&userfilter[role_id]=${userRole}`);
			const response = await axios.get(
				`${baseUrl}user${page}&perPage=4&userfilter[role_id]=${userRole}`,
				{
					headers: { 'ngrok-skip-browser-warning': true },
				},
			);
			if (response.status === 204) return 204;
			const users = Array.isArray(response.data.data)
				? response.data.data
				: Object.values(response.data.data);
			const data = { data: users, pages: response.data.links };
			console.log(data);
			return data;
		} else if (role !== '' && userState !== '' && input === '') {
			console.log('tercera: ', `${baseUrl}${page}&perPage=4&userfilter[state]=${state}&filter[role_id]=${userRole}`);
			const response = await axios.get(
				`${baseUrl}user?filter[state]=${state}&filter[role_id]=${userRole}&${page}&perPage=4`,
				{
					headers: { 'ngrok-skip-browser-warning': true },
				},
			);
			if (response.status === 204) return 204;
			const users = Array.isArray(response.data.data)
				? response.data.data
				: Object.values(response.data.data);
			const data = { data: users, pages: response.data.links };
			console.log(data);
			return data;
		} else if (input !== '') {
			console.log('cuarta: ', `${baseUrl}user/filter/${input}&${page}&perPage=4`);
			try {
				const response = await axios.get(`${baseUrl}user/filter/${input}${page}&perPage=4`, {
					headers: { 'ngrok-skip-browser-warning': true },
				});
				if (response.status === 204) return 204;
				const users = Array.isArray(response.data.data)
					? response.data.data
					: Object.values(response.data.data);
				const data = { data: users, pages: response.data.links };
				console.log(data);
				return data;
			} catch (error) {
				console.error(error);
			}
		}
	}
};

const changeUserStateRequest = async (id) => {
	try {
		const response = await axios.get(`${baseUrl}user/admin/user-state/${id}`, {
			headers: { 'ngrok-skip-browser-warning': true },
		});
		return response;
	} catch (error) {
		throw error;
	}
};

export { getUsers, filterUsers, changeUserStateRequest };
