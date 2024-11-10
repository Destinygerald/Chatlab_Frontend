import { URL } from '../URL.js'
import axios from 'axios'

export async function getProfile () {
	const res = await axios.get(`${URL}/user`, {
		withCredentials: true
	})

	return res;
}

export async function getFriendList () {
	const res = await axios.get(`${URL}/chat/friends`, {
		withCredentials: true
	})

	return res;
}

export async function getChats (id) {
	const res = await axios.get(`${URL}/chat/chats/${id}`, {
		withCredentials: true
	})
	
	return res;
}

export async function getPrevChats () {
	const res = await axios.get(`${URL}/chat/all`, {
		withCredentials: true
	})

	return res;
}

export async function getAllUsers () {
	const res = await axios.get(`${URL}/chat/people`, {
		withCredentials: true
	})

	return res;
}