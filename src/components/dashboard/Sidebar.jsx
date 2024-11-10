import '../../styles/dashboard.css'
import '../../styles/dashboard_mobile.css'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoIosSettings, IoMdPersonAdd } from 'react-icons/io'
import { RiMessage3Fill } from 'react-icons/ri'
import { MdGroups } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeChat } from '../../features/Chat.js'
import { addFriend, removeFriend } from '../../features/Friends.js'
import { controlChange } from '../../features/Control.js'
import { getAllUsers } from '../../api/functions.js'
import { addNewFriend } from '../../api/emitter.js'
import { newFriendAdded } from '../../api/event.js'

const Test1 = Array.from(Array(5))

function SidebarCard ({ name, lastChat, notif, img, time, id, selected }) {
	
	const dispatch = useDispatch()

	function clickHandler () {
		// get roomId from the db to emit all events to the room
		// emit the last_seen event to keep track of the users last seen
		dispatch(changeChat(id))
	}

	return (
		<div className={id == selected ? 'sdb-card active' : 'sdb-card'} onClick={clickHandler}>
			<div className='sdb-card-left'>
				<div className='sdb-card-img'> <img src={img} /> </div>

				<div className='sdb-card-info'>
					<span> {name || 'Name'} </span>
					<span> {lastChat || 'Hi'} </span>
				</div>
			</div>

			<div className='sdb-card-time'>
				{ time || '2 mins ago' }
			</div>

			{
				notif
				?
				<span className='sdb-card-notif'></span>
				:
				<span className='sdb-card-notif'>1</span>
			}
		</div>
	)
}


function NewUserCard ({ name, notif, img, id, selected }) {
	
	const FriendList = useSelector(state => state.friends.value) 
	const dispatch = useDispatch()

	// Check if the user is amongst the friend list

	console.log(id)

	function clickHandler () {
		// get roomId from the db to emit all events to the room
		
		// dispatch(changeChat(id))
		const user_is_friend = FriendList.find(item => item?.id == id)

		if (user_is_friend) {
			// no need to add to friend list again
			// change chat id and change sidebar position
			return;
		}

		addNewFriend(id)

		// add to friend list then do the same from the other userside
		// send an event that this user has sent the other user a request

	}

	return (
		<div className={id == selected ? 'sdb-card active' : 'sdb-card'} onClick={clickHandler}>
			<div className='sdb-card-left'>
				<div className='sdb-card-img'> <img src={img} /> </div>

				<div className='sdb-card-info'>
					<span> {name || 'Name'} </span>
				</div>
			</div>

			<div className='sdb-card-btns'>
				<button onClick={clickHandler}> Message </button>
			</div>
			

		</div>
	)
}

function SidebarDisplayChats ({ search, changeHandler, selectedChat }) {
	
	const friends = useSelector(state => state.friends.value)
	const dispatch = useDispatch()


	// console.log(friends)

	function addFriends () {
		dispatch(controlChange('add-friend'))
	}


	return (
		<>
			<div className='sdb-search'> 
				<input type='text' placeholder='Search' value={search} onChange={changeHandler} />
				<span className='sdb-search-icon'> <AiOutlineSearch /> </span>
			</div>

			<div className='sdb-scroll'>
				{
					friends?.length > 0
					?
					<div className='sdb-content'>
						{
							friends.map((itm, i) => (
								<SidebarCard key={i} selected={selectedChat} id={i} />
							))	
						}
					</div>
					:
					<div className='sdb-find-holder' onClick={addFriends}>Add Friend</div>
				}
			</div>
		</>
	)
}

function SidebarDisplayFind () {

	const [ find, setFind ] = useState('')
	const [ result, setResult ] = useState([])

	function findHandler(e) {
		setFind(e.target.value)
	}

	async function allUsers () {
		try {
			const res = await getAllUsers()
			setResult(res.data.data)
			// console.log('All users', res.data.data)
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		allUsers()
	}, [])

	return (
		<div className='sdb-find'>
			<div className='sdb-search'> 
				<input type='text' placeholder='Search' value={find} onChange={findHandler} />
				<span className='sdb-search-icon'> <AiOutlineSearch /> </span>
			</div>

			{
				result.length <= 0
				?
				<div className='sdb-find-holder'>Find Friend</div>
				: 
				<div className='sdb-scroll'>
					<div className='sdb-content'>
						{
							result.map((itm, i) => (
								<NewUserCard key={i} id={itm.id} name={itm.name} />
							))
						}
					</div>
				</div>
			}
		</div>
	)
}

function SidebarDisplayGroups ({ search, changeHandler, selectedChat }) {
	return (
		<>
			<div className='sdb-search'> 
				<input type='text' placeholder='Search' value={search} onChange={changeHandler} />
				<span className='sdb-search-icon'> <AiOutlineSearch /> </span>
			</div>

			<div className='sdb-scroll'>
				<div className='sdb-content'>
					{
						Test1.map((itm, i) => (
							<SidebarCard key={i} selected={selectedChat} id={i} />
						))
					}
				</div>
			</div>
		</>
	)
}
function SidebarDisplay ({ search, changeHandler, selectedChat  }) {

	const currentControl = useSelector(state => state.control.value)

	return (
		<>
			{
				currentControl == 'chats' 
				?
				<SidebarDisplayChats search={search} changeHandler={changeHandler} selectedChat={selectedChat} />
				:
				''
			}
			{
				currentControl == 'add-friend' 
				?
				<SidebarDisplayFind />
				:
				''
			}
			{
				currentControl == 'group' 
				?
				<SidebarDisplayGroups search={search} changeHandler={changeHandler} selectedChat={selectedChat} />
				:
				''
			}
		</>
	)
}


export function Sidebar () {
	
	const [ search, setSearch ] = useState('')

	const sidebarOpen = useSelector(state => state.sidebar.value)
	const selectedChat = useSelector(state => state.chat.value.selected)
	const control = useSelector(state => state.control.value)

	const dispatch = useDispatch()

	function changeHandler (e) {
		setSearch(e.target.value)
	}

	function sideFunc (arg) {
		dispatch(controlChange(arg))
	}

	function handleNewFriendAdding () {
		console.log("New friend shit")	
	}

	newFriendAdded(handleNewFriendAdding)	


	return (
		<div className={sidebarOpen ? 'sidebar' : 'sidebar-hide'}>

			<div className='sdb-side'>
				<div className='sdb-side-col'>
					<span className={control == 'chats' ? 'sdb-side-selected' : ''} onClick={() => sideFunc('chats')}> <RiMessage3Fill /> </span>
					<span className={control == 'add-friend' ? 'sdb-side-selected' : ''} onClick={() => sideFunc('add-friend')}> <IoMdPersonAdd /> </span>
					{/*<span className={control == 'group' ? 'sdb-side-selected' : ''} onClick={() => sideFunc('group')}> <MdGroups /> </span>*/}
					<span className={control == 'calls' ? 'sdb-side-selected' : ''} onClick={() => sideFunc('calls')}> <FaPhoneAlt /> </span>
				</div>

			</div>

			<div className='sdb-main'>
				<div className='sdb-hdr'>
					<span className='sdb-logo'> ChatLab </span>

					<div>
						<span />
						<span> <IoIosSettings /> </span>
					</div>
				</div>

				<SidebarDisplay search={search} changeHandler={changeHandler} selectedChat={selectedChat} />

				
			</div>

		</div>
	)
}