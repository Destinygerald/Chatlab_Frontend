import '../../styles/landingpage.css'
import { motion } from 'framer-motion'

function AnimatedChats () {
	return (
		<motion.div className='animated-chats'>
			<motion.div>Hello</motion.div>
			<motion.div className='from'>Hi there</motion.div>
			<motion.div className='from'>•••••</motion.div>
			<motion.div>•••••</motion.div>
			<motion.div className='from'>•••••</motion.div>
		</motion.div>
	)
}

export default AnimatedChats;