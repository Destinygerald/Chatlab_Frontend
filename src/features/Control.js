import { createSlice } from '@reduxjs/toolkit'

const ControlSlice = createSlice({
	name: 'control',
	initialState: { 
		value: 'chats' 
	},
	reducers: {
		controlChange: (state, actions) => {
			state.value = actions.payload
		}
	}
})

export default ControlSlice.reducer

export const { controlChange } = ControlSlice.actions 