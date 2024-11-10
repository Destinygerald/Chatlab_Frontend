import { socket } from '../socket.js'

export function loginEmitter () {
	// socket.connect()
	socket.emit('connected')
	console.log(socket)
	lastSeenEmitter()
}

export function lastSeenEmitter () {
	socket.emit('last_seen')
}

export function addNewFriend (friend_id) {
	socket.emit('new_friend', { friend_id })
}

export function sendMessageEmitter (info) {
	// info is the message, roomId and the recipientId 
	socket.emit('send_message', info)
}

export function readMessageEmitter (info) {
	// info is just the messageId and roomId
	socket.emit('read_message', info)
	lastSeenEmitter()
}

export function receivedMessageEmitter () {
	// info is just the messageId and roomId
	socket.emit('receive_message', info)
	lastSeenEmitter()
}

export function disconnectHandlerEmitter () {
	socket.disconnect()
}