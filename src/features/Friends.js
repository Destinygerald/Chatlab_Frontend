import { createSlice } from '@reduxjs/toolkit'

const Friends = createSlice({
	name: 'friends',
	initialState: { value: [] },
	reducers: {
		addFriend: (state, actions) => {
			state.value = actions.payload
		},

		removeFriend: (state, actions) => {
			// might change id to name
			state.value = state.value.filter(friend => friend.id != actions.payload)
		},

		resetFriendList: (state, actions) => {
			state.value = []
		}

	}
})

export default Friends.reducer

export const { addFriend, removeFriend, resetFriendList } = Friends.actions