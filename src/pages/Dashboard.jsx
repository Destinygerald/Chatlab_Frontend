import '../styles/dashboard.css'
import '../styles/dashboard_mobile.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Main from '../components/dashboard/Main.jsx'
import { Sidebar } from '../components/dashboard/Sidebar.jsx'
import { getProfile, getPrevChats, getFriendList, getChats } from '../api/functions.js'
import { loginEmitter } from '../api/emitter.js'
import { addUserInfo } from '../features/Userinfo.js'
import { addFriend, removeFriend, resetFriendList } from '../features/Friends.js'
import { addChats } from '../features/Chat.js'

const AllFriends = [1, 2, 3, 4]

function Dashboard () {

	const userinfo = useSelector(state => state.userinfo.value)
	const friends = useSelector(state => state.friends.value)
	const dispatch = useDispatch()

	const navigate = useNavigate()

	async function userProfile () {
		try {
			const res = await getProfile()

			if (res.status == 200) {
				// loginEmitter()
			}

			dispatch(addUserInfo(res.data.data))

		} catch (err) {
			console.error(err)
			navigate('/login')
			return
		}
	}

	async function getFriends () {
		try {
			const res = await getFriendList()

			// call this function again when the new chat event is triggered
			dispatch(resetFriendList())
			dispatch(addFriend(res.data.data))		

		} catch (err) {
			console.error(err)
		}
	}

	async function getMyChats (id) {
		try {
			const res = await getChats(id)
			console.log(res)
			// dispatch(addChats(res.data.data))
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		// Emit the logged in event provided that the user is logged in
		// to know if the user is logged in, check if the cookie has expired
		// emit the last_seen event also

		userProfile()
		if (!userinfo.name) {
			userProfile()
		}

		getFriends();

		if (friends?.length <= 0) return;

		friends?.forEach((i) => {
			getMyChats(i?.id)
		})
		

		return () => {

		}

	}, [])

	// console.log(userinfo)

	return (
		<div className='dashboard'>
			<div className='dashboard-container'>
				<Sidebar />
				<Main />
			</div>
		</div>
	)
}

export default Dashboard;