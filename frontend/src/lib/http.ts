import axios from 'axios'

export const httpClient = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:8080/api',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'ngrok-skip-browser-warning': true
	}
})
