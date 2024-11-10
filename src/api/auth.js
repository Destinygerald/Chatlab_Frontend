import { URL } from '../URL.js'
import axios from 'axios'


export async function login ({ email, password }) {

	if (!email || !password) {
		throw ({
			message: 'Invalid Credentials',
			status: 'Failed'
		})
	}

	const res = await axios.post(`${URL}/auth/login`, { 
		email, password 
	}, { withCredentials: true })

	return res;
}


export async function register ({ username, email, password }) {

	if (!email || !password || !username) {
		throw ({
			message: 'Invalid Credentials',
			status: 'Failed'
		})
	}

	const res = await axios.post(`${URL}/auth/register`, { 
		name: username, email, password 
	})
	
	return res;
}