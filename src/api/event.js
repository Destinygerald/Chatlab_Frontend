import { socket } from '../socket.js'
import { receivedMessageEmitter } from './emitter.js'

export function newMessages () {
	// handles notifications
	// check which room user is in to determine if it is among the list of 
	// rooms with new messages


	// data includes message, senderId, and messageId 
	socket.on('new_messages', (data) => {
		// add notifications for new messages
		// emit the receivedMessage from the emitter file '../emitter.js'
	})
}

export function messageReceived () {
	// handles the double tick
	// this event is received when the receiving end ackonwledges the message delivery


	// data includes the roomId and the messageId
	socket.on('message_received', (data) => {

	})
}

export function messageRead () {
	// handles the blue double tick
	// this event is received when the receiving end reads the message


	// data includes the roomId and the messageId
	socket.on('message_read', (data) => {

	})
}


export function newFriendAdded (func) {
	socket.on('new_friend_added', async(data) => {
		socket.join(data.room_id)

		if (typeof(func) != 'function') {
			return;
		}

		func()
	})
}

export function friendLoggedOut () {
	// handles the case of when a friend logs out - probably durring a conversation
	// to notify this user that his friend has gone offline and display the last seen of the friend

	// data is the userId of the friend
	// try logging the socket object to the console
	socket.on('logged_out', (data) => {

	})
}