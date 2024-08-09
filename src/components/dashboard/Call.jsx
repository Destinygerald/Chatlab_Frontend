import '../../styles/dashboard.css'
import '../../styles/dashboard_mobile.css'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { endCall } from '../../features/CallFeature.js' 

const Variants = {
	initial: {
		scale: 0
	},
	animate: {
		scale: 1
	},
	exit: {
		scale: 0
	}
}

const transition = {
	duration: .6
}


function CallScreen ({ waiting }) {

	const voiceCall = useSelector(state => state.call.value)
	const dispatch = useDispatch()

	function closeCall () {
		dispatch(endCall())
	}

	return (
			<div className='call-waiting'>
				<div className='call-hdr'>
					<div></div>
					<div> Calling Friend... </div>
				</div>

				<div className='call-btns'>
					<div className='cancel-call' onClick={closeCall}> <FaPhoneAlt /> </div>
					{
						waiting || <div className='mute-call'> <FaPhoneAlt /> </div>
					}
				</div>
			</div>
	)
}


function Call () {

	const [ waiting, setWaiting ] = useState(false)

	return (
		<motion.div className='call' initial='initial' animate='animate' exit='exit' variants={Variants} transition={transition}>
			<div className='call-container'>
				<CallScreen waiting={waiting} />
			</div>
		</motion.div>
	)
}

export default Call