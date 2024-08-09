import { createSlice } from '@reduxjs/toolkit'

const CallSlice = createSlice({
	name: 'call',
	initialState: { value: false },
	reducers: {
		initCall: (state, actions) => {
			state.value = true
		},

		endCall: (state, actions) => {
			state.value = false
		}
	}
})

export default CallSlice.reducer

export const { initCall, endCall } = CallSlice.actions