import { createSlice } from '@reduxjs/toolkit'

const Chat = createSlice({
	name: 'chat',
	initialState: { 
		value: {
			selected: 0, // the friend's id
			chats: [] // is an array of objects which contains room_id and array of messages for easy sorting
		} 
	},
	reducers: {
		changeChat: (state, actions) => {
			state.value.selected = actions.payload
		},

		addChats: (state, actions) => {
			// check if there exists chats for that room
			if (!state.value?.chats.find(chat => chat?.room_id == actions?.payload?.room_id )) {
				state.value.chats.push({
					room_id: actions?.payload?.room_id,
					messages: [{
						message_id: actions?.payload?.message_id,
						sender: actions?.payload?.sender,
						receiver: actions?.payload?.receiver,
						room_id: actions?.payload?.room_id,
						message: actions?.payload?.message,
						created: actions?.payload?.created,
						received: actions?.payload?.received,
						read: actions?.payload?.read,
					}]
				})
				return;
			}

			let chatExist = state?.value?.chats?.map(chat => {
				if (chat.room_id == actions?.payload?.room_id) {
					return chat?.messages.find(msg => msg.message_id == actions?.payload?.message_id)
				}
			})

			// might have to make the chat time the primary key instead of the message_id from the backend
			if (chatExist) return;


			// find the chat from the actions?.payload?.room_id
			state.value.chats.map(chat => {
				if (chat.room_id == actions.payload.room_id) {
					state.value.chats.messages.push(actions.payload)
				}
			})
		},

		markAsRead: (state, actions) => {
			let chatExist = state?.value?.chats?.map(chat => {
				if (chat.room_id == actions?.payload?.room_id) {
					return chat?.messages.find(msg => msg.message_id == actions?.payload?.message_id)
				}
			})

			// might have to make the chat time the primary key instead of the message_id from the backend
			if (!chatExist) return;

			state?.value?.chats?.map(chat => {
				if (chat.room_id == actions?.payload?.room_id) {
					chat?.messages.map(msg => {
						if (msg.message_id == actions?.payload?.message_id) {
							msg.read = true
							return;
						}
					})
				}
			})
		},

		messageReceived: (state, actions) => {
			let chatExist = state?.value?.chats?.map(chat => {
				if (chat.room_id == actions?.payload?.room_id) {
					return chat?.messages.find(msg => msg.message_id == actions?.payload?.message_id)
				}
			})

			// might have to make the chat time the primary key instead of the message_id from the backend
			if (!chatExist) return;

			state?.value?.chats?.map(chat => {
				if (chat.room_id == actions?.payload?.room_id) {
					chat?.messages.map(msg => {
						if (msg.message_id == actions?.payload?.message_id) {
							msg.received = true
							return;
						}
					})
				}
			})
		}

	}
})

export default Chat.reducer;

export const { changeChat, addChats, markAsRead, messageReceived } = Chat.actions;