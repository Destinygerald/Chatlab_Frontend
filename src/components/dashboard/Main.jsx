import '../../styles/dashboard.css'
import '../../styles/dashboard_mobile.css'
import { BsFillSendFill, BsX } from "react-icons/bs";
import { FaPhoneAlt } from 'react-icons/fa'
import { IoVideocam } from 'react-icons/io5'
import { IoMdPeople } from 'react-icons/io'
import { CiMenuKebab } from 'react-icons/ci'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initCall } from '../../features/CallFeature.js'
import { openSidebar, closeSidebar } from '../../features/Sidebar.js'
import Call from './Call.jsx'

function Topbar () {
	return (
		<div className='topbar'>

		</div>
	)
}

const Chats = [
	{
		from: 'you',
		message: '••••••',
		time: '11:50'
	},
	{
		from: 'friend',
		message: '••••••',
		time: '11:51'
	},
	{
		from: 'you',
		message: '••••••',
		time: '11:53'
	},
	{
		from: 'friend',
		message: '••••••',
		time: '11:51'
	},
	{
		from: 'friend',
		message: '••••••',
		time: '11:51'
	},
	{
		from: 'you',
		message: '••••••',
		time: '11:51'
	},
	{
		from: 'you',
		message: '••••••',
		time: '11:53'
	},
	{
		from: 'friend',
		message: '••••••',
		time: '11:51'
	},
	{
		from: 'friend',
		message: '••••••',
		time: '11:51'
	},
	{
		from: 'you',
		message: '••••••',
		time: '11:51'
	},
	{
		from: 'you',
		message: '••••••',
		time: '11:53'
	},
	{
		from: 'friend',
		message: '••••••',
		time: '11:51'
	},
	{
		from: 'friend',
		message: '••••••',
		time: '11:51'
	},
	{
		from: 'you',
		message: '••••••',
		time: '11:51'
	},
	{
		from: 'you',
		message: '••••••',
		time: '11:53'
	},
	{
		from: 'friend',
		message: '••••••',
		time: '11:51'
	},
	{
		from: 'friend',
		message: '••••••',
		time: '11:51'
	},
	{
		from: 'you',
		message: '••••••',
		time: '11:51'
	},
	{
		from: 'you',
		message: '••••••',
		time: '11:53'
	},
	{
		from: 'friend',
		message: '••••••',
		time: '11:51'
	},
	{
		from: 'friend',
		message: '••••••',
		time: '11:51'
	},
	{
		from: 'you',
		message: '••••••',
		time: '11:51'
	},
]


function MessageCard ({ from, message, time }) {	
	return (
		<div className={from == 'you' ? 'chat-msg yours' : 'chat-msg'}>
			<div className='chat-msg-info'>{message}</div>
			<div className='chat-msg-time'>{time}</div>
		</div>
	)
}

function ChatBox () {

	const [ message, setMessage ] = useState('')

	// Use the code below instead of the placeholder own
	// const Chats = useSelector(state => state.chat.value.chats)

	function changeHandler(e) {
		setMessage(e.target.value)
	}

	function sendMessage () {

	}

	function textareaResize (textarea) {
		textarea.style.height = 'auto'
		textarea.style.height = `${textarea?.scrollHeight}px`
		textarea.style.maxHeight = '120px'
	}

	useEffect(() => {
		const textarea = document.querySelector('.chat-textarea')

		if (!textarea) return;

		textarea.addEventListener('input', () => textareaResize(textarea))

		return () => textarea.removeEventListener('input', () => textareaResize(textarea))

	}, [message])

	return (
		<div className='chat-box'>
			<div className='chat-container'>	
				<div className='chat-display'>
					{
						Chats.map((chat, i) => (
							<MessageCard key={'chat' + i} from={chat.from} message={chat.message} time={chat.time} />
						))
					}
				</div>
			</div>

			<div className='chat-input'> 
				<textarea className='chat-textarea' value={message} onChange={changeHandler}></textarea>

				<div className='chat-btn'>
					<BsFillSendFill />
				</div>
			</div>
		</div>
	)
}

function Main () {

	const [ more, setMore ] = useState(false)

	const voiceCall = useSelector(state => state.call.value)

	const sidebar = useSelector(state => state.sidebar.value)
	// const selectedChat = useSelector(state => state.chat.value.selected)
	// fetch chat contents with this
	
	const dispatch = useDispatch()

	const moreRef = useRef(null)

	function clickMore () {
		setMore(!more)
	}

	useEffect(() => {
		if (!more) return

		const Main = document.querySelector('.main')

		function close(e) {
			if (!moreRef.current.contains(e.target)) {
				setMore(false)
			}
		}

		Main.addEventListener('pointerdown', close)

		return () => Main.removeEventListener('pointerdown', close)
	})	

	function makeCall () {
		dispatch(initCall())
	}

	function toggleSidebar () {
		if (sidebar) {
			dispatch(closeSidebar())
		} else {
			dispatch(openSidebar())
		}
	}


	return (
		<div className='main'>
			<div className='main-hdr'>
				<div>
					<span className='main-hdr-people' onClick={toggleSidebar}>
					{ 
						!sidebar
						?
						// <IoMdPeople />
						<HiOutlineMenuAlt1 />
						:
						<BsX />
					} 
					</span>
					<span className='main-hdr-name'> Name </span>
				</div>

				<div className='main-hdr-icons'>
					<span onClick={makeCall}> <FaPhoneAlt /> </span>
					<span> <IoVideocam /> </span>
					<span onClick={clickMore}> <CiMenuKebab /> </span>

					{
						more && <div className='clear-chat' ref={moreRef}> Clear Chat </div>
					}
				</div>
			</div>

			<ChatBox />

			{ voiceCall && <Call /> }
		</div>
	)
}

export default Main;