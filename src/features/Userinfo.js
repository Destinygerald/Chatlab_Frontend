import { createSlice } from '@reduxjs/toolkit'

const Userinfo = createSlice({
	name: 'userinfo',
	initialState: { value: {
		name: '',
		id: '',
		email: ''
	} },
	reducers: {
		addUserInfo: (state, actions) => {
			state.value = actions.payload
		}
	}
})

export default Userinfo.reducer

export const { addUserInfo } = Userinfo.actions