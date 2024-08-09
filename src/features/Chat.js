import { createSlice } from '@reduxjs/toolkit'

const Chat = createSlice({
	name: 'chat',
	initialState: { 
		value: {
			selected: 0
		} 
	},
	reducers: {
		changeChat: (state, actions) => {
			state.value.selected = actions.payload
		}
	}
})

export default Chat.reducer;

export const { changeChat } = Chat.actions;