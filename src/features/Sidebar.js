import { createSlice } from '@reduxjs/toolkit'

const Sidebar = createSlice({
	name: 'sidebar',
	initialState: { value : false },
	reducers: {
		openSidebar: (state, actions) => {
			state.value = true
		},

		closeSidebar: (state, actions) => {
			state.value = false
		}
	}
})

export default Sidebar.reducer

export const {  openSidebar, closeSidebar } = Sidebar.actions