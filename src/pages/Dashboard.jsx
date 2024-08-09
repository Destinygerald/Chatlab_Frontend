import '../styles/dashboard.css'
import Main from '../components/dashboard/Main.jsx'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoIosSettings, IoMdPersonAdd } from 'react-icons/io'
import { RiMessage3Fill } from 'react-icons/ri'
import { MdGroups } from 'react-icons/md'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeChat } from '../features/Chat.js'
import { controlChange } from '../features/Control.js'

const Test = Array.from(Array(24))

function SidebarCard ({ name, lastChat, notif, img, time, id, selected }) {
	
	const dispatch = useDispatch()

	function clickHandler () {
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

function Sidebar () {
	
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


	return (
		<div className={sidebarOpen ? 'sidebar' : 'sidebar-hide'}>

			<div className='sdb-side'>
				<div className='sdb-side-col'>
					<span className={control == 'chats' ? 'sdb-side-selected' : ''} onClick={() => sideFunc('chats')}> <RiMessage3Fill /> </span>
					<span className={control == 'add-friend' ? 'sdb-side-selected' : ''} onClick={() => sideFunc('add-friend')}> <IoMdPersonAdd /> </span>
					<span className={control == 'group' ? 'sdb-side-selected' : ''} onClick={() => sideFunc('group')}> <MdGroups /> </span>
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

				<div className='sdb-search'> 
					<input type='text' placeholder='Search' value={search} onChange={changeHandler} />
					<span className='sdb-search-icon'> <AiOutlineSearch /> </span>
				</div>

				<div className='sdb-scroll'>
					<div className='sdb-content'>
						{
							Test.map((itm, i) => (
								<SidebarCard key={i} selected={selectedChat} id={i} />
							))
						}
					</div>
				</div>
			</div>

		</div>
	)
}

function Dashboard () {
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